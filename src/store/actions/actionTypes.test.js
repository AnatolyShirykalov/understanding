import * as actionTypes from './actionTypes';

it('should be uniq', () => {
  const keys = Object.keys(actionTypes);
  expect([...(new Set(keys))].length).toBe(keys.length);
});
