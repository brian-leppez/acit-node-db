/* @flow */

import { Router } from 'express';
import Conversation from '../lib/watson/conversation';
import logger from '../logger';

const router = new Router();
const conversation = new Conversation();

// Middleware for default route
const beginConversation = async (req, res) => {
  let stringifiedOutput: string = '';
  try {
    const response: Object = await conversation.message('Hello');
    const { output: { text } } = response;
    stringifiedOutput = text.join('. ');
  } catch (error) {
    logger.error(error);
    stringifiedOutput = `There was an error retrieving a response from the conversation service!`;
  }
  res.send(stringifiedOutput);
};

// Register your routes and middleware to handle them here!!
router.get('/', beginConversation);

export default router;
