/* @flow */

import { Router } from 'express';
import message from '../lib/watson/conversation';

const router = new Router();

//
// Register your routes here.
//
router.get('/', async (req, res) => {
  try {
    const response = await message('Hello');
    const { output: { text } } = response;
    const stringifiedOutput = text.join('. ');
    res.send(stringifiedOutput);
  } catch (e) {
    res.send("There was an error getting a response from the conversation service! " + e.message);
  }
});

export default router;
