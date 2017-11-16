# NodeJS starter kit for ACIT

For the full list of automation scripts available in this project, please refer to "scripts"
section in the [`package.json`](./package.json) file and the [`tools`](./tools) folder.


## Testing

```bash
yarn lint                       # Find problematic patterns in code
yarn check                      # Check source code for type errors
```

For more information visit http://facebook.github.io/jest/


## Debugging

In order to run the app with V8 inspector enabled, simply replace `node tools/run.js`
with `node --inspect=0.0.0.0:9229 tools/run.js`

## Reference Articles and Tutorials

* [Stop using JWT for sesstions](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)
  ([part 2](http://cryto.net/~joepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/))
  by [Sven Slootweg](https://github.com/joepie91)
* [How to Safely Store Your Users' Passwords](https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016) by [P.I.E.](https://paragonie.com/)

