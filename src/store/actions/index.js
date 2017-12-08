import * as actionTypes from './actionTypes';
import {add, chain, common, prod, inverse} from '../../core/calculus/examples';
import {makeFormula} from '../../core/bool';
import hash from 'object-hash';

export const changeMathInput = (taskId, inputId, value) => ({
  type: actionTypes.CHANGE_MATH_INPUT,
  taskId, inputId, value
});

export const changeMathExpression = (taskId, expression) => ({
  type: actionTypes.CHANGE_MATH_EXPRESSION,
  taskId, expression
});

export const setRandomMathChainExpression = (taskId, depth) => ({
  type: actionTypes.SET_RANDOM_MATH_CHAIN_EXPRESSION,
  expression: chain(depth), taskId
});

export const setRandomMathAddExpression = (taskId, depth) => ({
  type: actionTypes.SET_RANDOM_MATH_ADD_EXPRESSION,
  expression: add(depth), taskId
});

export const setRandomMathProdExpression = (taskId, depth) => ({
  type: actionTypes.SET_RANDOM_MATH_PROD_EXPRESSION,
  expression: prod(depth), taskId
});

export const setRandomMathCommonExpression = (taskId, depth) => ({
  type: actionTypes.SET_RANDOM_MATH_COMMON_EXPRESSION,
  expression: common(depth), taskId
});

export const setRandomMathInverseExpression = (taskId, depth) => ({
  type: actionTypes.SET_RANDOM_MATH_INVERSE_EXPRESSION,
  expression: inverse(depth), taskId
});

export const createChildMathTask = (parentId, parentInputId, parentKind, expression) => ({
  type: actionTypes.CREATE_CHILD_MATH_TASK,
  parentId, expression, parentInputId, parentKind,
  key: hash({expression, parentId, parentKind})
})

export const createChildMathTaskAndRedirect =
  (parentId, parentInputId, parentKind, expression, history, kind) => dispatch => {
    dispatch(createChildMathTask(parentId, parentInputId, parentKind, expression));
    history.push(`/math/tasks/${kind}/${hash({expression, parentId, parentKind})}`);
};

export const setMathExpressionToParentTask =
  (parentId, parentInputId, expression) =>({
    type: actionTypes.SET_MATH_EXPRESSION_TO_PARENT_TASK,
    parentId, parentInputId, expression,
  });

export const setMathExpressionToParentTaskAndRedirect =
  (parentId, parentInputId, expression, history, kind) => dispatch => {
    dispatch(setMathExpressionToParentTask(parentId, parentInputId, expression));
    history.push(`/math/tasks/${kind}/${parentId}`);
  };

export const selectDiffTableItem = (taskId, fun) => ({
  type: actionTypes.SELECT_DIFF_TABLE_ITEM,
  taskId, fun,
});


export const setRandomBoolTableFormula = (taskId, depth, vars=['x','y']) => ({
  type: actionTypes.SET_RANDOM_BOOL_TABLE_FORMULA,
  taskId,
  formula: makeFormula(vars, depth),
});

export const updateBoolTableAnswer = (taskId, index, value) => ({
  type: actionTypes.UPDATE_BOOL_TABLE_ANSWER,
  taskId, index, value,
});
