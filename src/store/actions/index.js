import * as actionTypes from './actionTypes';
import {generate} from '../../core/calculus/examples';
import hash from 'object-hash';

export const changeMathInput = (taskId, inputId, value) => ({
  type: actionTypes.CHANGE_MATH_INPUT,
  taskId, inputId, value
});

export const changeMathExpression = (taskId, expression) => ({
  type: actionTypes.CHANGE_MATH_EXPRESSION,
  taskId, expression
});

export const setRandomMathExpression = taskId => ({
  type: actionTypes.SET_RANDOM_MATH_EXPRESSION,
  expression: generate(), taskId
});

export const createChildMathTask = (parentId, expression) => ({
  type: actionTypes.CREATE_CHILD_MATH_TASK,
  parentId, expression,
  key: hash({expression, parentId})
})

export const createChildMathTaskAndRedirect = (parentId, expression, history) => dispatch => {
  dispatch(createChildMathTask(parentId, expression));
  history.push(`/math/tasks/${hash({expression, parentId})}`);
};
