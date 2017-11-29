import * as actionTypes from './actionTypes';
export const changeMathInput = (inputId, value) => ({
  type: actionTypes.CHANGE_MATH_INPUT,
  inputId, value
});
export const calculusDiffToggleHint = () => ({
  type: actionTypes.CALCULUS_DIFF_TOGGLE_HINT
})
