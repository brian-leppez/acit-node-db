#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const pkg = require('../package.json');
const task = require('./task');

let build;
let server;
let debugPort = '9230';

const serverQueue = [];
const isDebug = process.execArgv.some(x => x.startsWith('--inspect'));

// Gracefull shutdown
process.once('cleanup', () => {
  if (server) {
    server.addListener('exit', () => process.exit());
    server.kill('SIGTERM');
    serverQueue.forEach(x => x.kill());
  } else {
    process.exit();
  }
});
process.on('SIGINT', () => process.emit('cleanup'));
process.on('SIGTERM', () => process.emit('cleanup'));

// Ensure that Node.js modules were installed,
// at least those required to build the app
try {
  build = require('./build');
} catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') throw err;
  cp.spawnSync('npm', ['install', '--no-progress'], { stdio: 'inherit' });

  // Clear Module's internal cache
  try {
    const Module = require('module');
    const m = new Module();
    // eslint-disable-next-line
    m._compile(
      fs.readFileSync('./tools/build.js', 'utf8'),
      path.resolve('./tools/build.js'),
    );
  } catch (error) {} // eslint-disable-line

  // Reload dependencies
  build = require('./build');
}

// Launch `node build/server.js` on a background thread
function spawnServer() {
  return cp.spawn(
    'node',
    [
      // Pre-load application dependencies to improve "hot reload" restart time
      ...Object.keys(pkg.dependencies).reduce(
        (requires, val) => requires.concat(['--require', val]),
        [],
      ),
      // If the parent Node.js process is running in debug (inspect) mode,
      // launch a debugger for Express.js app on the next port
      ...process.execArgv.map(arg => {
        if (arg.startsWith('--inspect')) {
          const match = arg.match(/^--inspect=(\S+:|)(\d+)$/);
          if (match) debugPort = Number(match[2]) + 1;
          return `--inspect=${match ? match[1] : '0.0.0.0:'}${debugPort}`;
        }
        return arg;
      }),
      '--no-lazy',
      // Enable "hot reload", it only works when debugger is off
      ...(isDebug
        ? ['./server.js']
        : [
            '--eval',
            'process.stdin.on("data", data => { if (data.toString() === "load") require("./server.js"); });',
          ]),
    ],
    { cwd: './build', stdio: ['pipe', 'inherit', 'inherit'], timeout: 3000 },
  );
}

module.exports = task('run', () =>
  Promise.resolve()
    // Compile and launch the app in watch mode, restart it after each rebuild
    .then(() =>
      build({
        watch: true,
        onComplete() {
          if (isDebug) {
            if (server) {
              server.on('exit', () => {
                server = spawnServer();
              });
              server.kill('SIGTERM');
            } else {
              server = spawnServer();
            }
          } else {
            if (server) server.kill('SIGTERM');
            server = serverQueue.splice(0, 1)[0] || spawnServer();
            server.stdin.write('load'); // this works faster than IPC
            if (server)
              while (serverQueue.length < 3) serverQueue.push(spawnServer());
          }
        },
      }),
    )
    // Resolve the promise on exit
    .then(
      () =>
        new Promise(resolve => {
          process.once('exit', () => {
            if (server) server.kill();
            resolve();
          });
        }),
    ),
);
