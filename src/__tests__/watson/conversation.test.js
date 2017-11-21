/* @flow */
/* eslint-env jest */

import toBeType from 'jest-tobetype';

import Conversation from '../../../src/lib/watson/conversation';

expect.extend(toBeType);
const conversation = new Conversation();

describe('smoke test', () =>
  test('confirm we get a response from Watson', () => {
    expect.assertions(1);
    return expect(conversation.message('')).resolves.toBeDefined();
  }));

describe('unit test', () =>
  test('validate output structure from Watson', () => {
    expect.assertions(6);
    return conversation.message('').then(response => {
      expect(response).toBeType('object');
      expect(response.context).toBeType('object');
      expect(response.output).toBeType('object');
      expect(response.output.text).toBeType('array');
      expect(response.intents).toBeType('array');
      expect(response.entities).toBeType('array');
    });
  }));

/* 
* would like something like the below to work, but it is not supported at this time

https://github.com/facebook/jest/issues/3457


describe('unit test', () =>
  test('validate output structure from Watson 2', () => {
    expect.assertions(1);
    return expect(
      conversation.message('Hello'),
    ).resolves.expect.objectContaining({
      context: expect.any(Object),
      output: expect.objectContaining({
        text: expect.any(String),
      }),
    });
    // expect(response.output).toBeDefined();
    // expect(response.output.text).toBeDefined();
    // expect(response.intents).toBeDefined();
    // expect(response.entities).toBeDefined();
  }));

*/
