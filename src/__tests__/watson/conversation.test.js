/* @flow */
/* eslint-env jest */

import Conversation from '../../../src/lib/watson/conversation';

const conversation = new Conversation();

test('confirm we get a response from Watson', () =>
  expect(conversation.message('Hello')).resolves.toBeDefined());
