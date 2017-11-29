import * as actionTypes from './actionTypes';
import {generate} from '../../core/calculus/examples';

export const changeMathInput = (inputId, value) => ({
  type: actionTypes.CHANGE_MATH_INPUT,
  inputId, value
});

export const changeMathExpression = expression => ({
  type: actionTypes.CHANGE_MATH_EXPRESSION,
  expression
});

export const setRandomMathExpression = () => ({
  type: actionTypes.SET_RANDOM_MATH_EXPRESSION,
  expression: generate()
});
