/* eslint-env jest */

import toBeType from 'jest-tobetype';

import Conversation from '../../../src/lib/watson/conversation';

expect.extend(toBeType);

const conversation = new Conversation();

//
// Test helper functions
//

function getAllNestedKeysTypesAndLength(obj, keys) {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      if (
        Object.prototype.toString.call(value) === '[object Object]' ||
        Object.prototype.toString.call(value) === '[object Array]'
      ) {
        getAllNestedKeysTypesAndLength(value, keys);
      }
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      keys.push({
        name: key,
        type: Object.prototype.toString.call(value),
        length: value.length,
      });
      getAllNestedKeysTypesAndLength(value, keys);
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      keys.push({
        name: key,
        type: Object.prototype.toString.call(value),
        length: 1,
      });
      getAllNestedKeysTypesAndLength(value, keys);
    } else {
      keys.push({
        name: key,
        type: Object.prototype.toString.call(value),
        length: 1,
      });
    }
  });
  return keys;
}

//
// Begin Tests
//

// Global variables for testing
describe('smoke test', () => {
  test('confirm we get a response from Watson', () => {
    expect.assertions(1);
    return expect(conversation.message('')).resolves.toBeDefined();
  });
});

describe('integration test', () => {
  test('confirm Watson JSON properties matches saved JSONs properties', async () => {
    expect.assertions(1);
    const expectedJSON =
      '{"intents":[{"intent":"greetings","confidence":1}],"entities":[],"input":{"text":"Hello"},"output":{"text":["Hi. It looks like a nice drive today. What would you like me to do?  "],"nodes_visited":["Start And Initialize Context"],"log_messages":[]},"context":{"conversation_id":"5ef23542-053f-41f0-ac25-1f62447bc3f1","system":{"dialog_stack":[{"dialog_node":"root"}],"dialog_turn_counter":1,"dialog_request_counter":1,"_node_output_map":{"Start And Initialize Context":[0,0]},"branch_exited":true,"branch_exited_reason":"completed"},"AConoff":"off","lightonoff":"off","musiconoff":"off","appl_action":"","heateronoff":"off","volumeonoff":"off","wipersonoff":"off","default_counter":0}}';
    const actualJSON = await conversation.message('Hello');
    const actualKeys = [];
    const expectedKeys = [];
    getAllNestedKeysTypesAndLength(actualJSON, actualKeys).sort();
    getAllNestedKeysTypesAndLength(
      JSON.parse(expectedJSON),
      expectedKeys,
    ).sort();
    expect(actualKeys).toEqual(expectedKeys);
  });
});

describe('unit test', () => {
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
  });

  test('2 to equal 3', () => {
    expect(2).toBe(3);
  });
});
