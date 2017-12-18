import * as actionTypes from './actionTypes';
import {makeFormula, makeEquality} from '../../core/bool/mjs';
import hash from 'object-hash';

export const setRandomBoolTableFormula = (taskId, depth, vars=['x','y']) => ({
  type: actionTypes.SET_RANDOM_BOOL_TABLE_FORMULA,
  taskId,
  formula: makeFormula(vars, depth),
});

export const setRandomBoolEqualFormula = (taskId, depth, vars=['x', 'y']) => ({
  type: actionTypes.SET_RANDOM_BOOL_EQUAL_FORMULA,
  taskId,
  formula: makeEquality(vars, depth),
});

export const updateBoolTableAnswer = (taskId, index, value) => ({
  type: actionTypes.UPDATE_BOOL_TABLE_ANSWER,
  taskId, index, value,
});

export const updateBoolEvalAnswer = (taskId, value) => ({
  type: actionTypes.UPDATE_BOOL_EVAL_ANSWER,
  taskId, value,
});

export const setBoolChildTask = (parentId, parentKey, parentKind, formula) => ({
  type: actionTypes.SET_BOOL_CHILD_TASK,
  parentId, parentKey, parentKind, formula,
  key: hash({formula, parentId, parentKind}),
});

export const setBoolChildTaskAndRedirect =
  (parentId, parentKey, parentKind, formula, history, kind) => dispatch => {
    dispatch(setBoolChildTask(parentId, parentKey, parentKind, formula));
    history.push(`/math/tasks/${kind}/${hash({formula, parentId, parentKind})}`);
};

export const setBoolFormulaToParentTask =
  (parentId, parentKey, formula) => ({
    type: actionTypes.SET_BOOL_FORMULA_TO_PARENT_TASK,
    parentId, parentKey, formula,
  });

export const setBoolFormulaToParentTaskAndRedirect =
  (parentId, parentKey, formula, history, kind) => dispatch => {
    dispatch(setBoolFormulaToParentTask(parentId, parentKey, formula));
    history.push(`/math/tasks/${kind}/${parentId}`);
  };
