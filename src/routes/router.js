/* @flow */

import { Router } from 'express';
import message from '../lib/watson/conversation';

const router = new Router();

// Register your routes here.

router.get('/', async (req, res) => {
  let stringifiedOutput = '';
  try {
    const response = await message('Hello');
    const { output: { text } } = response;
    stringifiedOutput = text.join('. ');
  } catch (e) {
    stringifiedOutput = `There was an error getting a response from the conversation service! ${e.message}`;
  }
  res.send(stringifiedOutput);
});

export default router;
