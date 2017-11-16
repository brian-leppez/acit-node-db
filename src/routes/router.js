/* @flow */

import { Router } from 'express';
import message from '../lib/watson/conversation';

const router = new Router();

// async function converse() {
//   const response = await message('hello');
//   console.log(response);
// }
//
// Register your routes here.
//
router.get('/', async (req, res) => {
  // message('hello')
  //   .then(data => {
  //     console.info(`what up ${JSON.stringify(data)}`);
  //   })
  //   .catch(err => {
  //     console.info('error');
  //     throw new Error(err);
  //   });
  const response = await message('hello');
  const { output: { text } } = response;
  const joinedOutput = text.join('. ');
  res.send({ message: joinedOutput });
});

export default router;
