/* @flow */

import { Router } from 'express';
import message from '../lib/watson/conversation';

const router = new Router();

//
// Register your routes here.
//
router.get('/', async (req, res) => {
  const response = await message('Hello');
  const { output: { text } } = response;
  const stringifiedOutput = text.join('. ');
  res.send(stringifiedOutput);
});

export default router;
