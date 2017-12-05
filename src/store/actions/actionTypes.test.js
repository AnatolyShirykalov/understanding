import * as actionTypes from './actionTypes';

it('should be uniq', () => {
  const keys = Object.keys(actionTypes);
  expect([...(new Set(keys.map(k=>actionTypes[k])))].length).toBe(keys.length);
});
