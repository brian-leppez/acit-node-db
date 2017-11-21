/* @flow */

import { Router } from 'express';
import Conversation from '../lib/watson/conversation';

const router = new Router();
const conversation = new Conversation();

// Register your routes here.

router.get('/', async (req, res) => {
  let stringifiedOutput: string = '';
  try {
    const response: Object = await conversation.message('Hello');
    const { output: { text } } = response;
    stringifiedOutput = text.join('. ');
  } catch (e) {
    stringifiedOutput = `There was an error getting a response from the conversation service! ${e.message}`;
  }
  res.send(stringifiedOutput);
});

export default router;
