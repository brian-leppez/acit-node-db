/* eslint-env jest */

import toBeType from 'jest-tobetype';

import Discovery from '../../../src/lib/watson/discovery';

expect.extend(toBeType);

const discovery = new Discovery();

//
// Test helper functions
//

//
// Begin Tests
//

// Global variables for testing
describe('smoke test', () => {
  test('confirm we get a response from Watson', () => {
    expect.assertions(1);
    return expect(discovery.query('')).resolves.toBeDefined();
  });
});

describe('unit test', () => {
  test('validate output structure from Watson', () => {
    expect.assertions(7);
    return discovery.query('').then(response => {
      expect(response).toBeType('object');
      expect(response.matching_results).toBeType('string');
      expect(response.passages).toBeType('array');
      expect(response.results).toBeType('array');
      expect(response.results[0]).toBeType('object');
      expect(response.results[0].result_metadata).toBeType('object');
      expect(response.results[0].text).toBeType('string');
    });
  });
});
