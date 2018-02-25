import * as actionTypes from './actionTypes';

export const setCurrentError = error => ({type: actionTypes.SET_CURRENT_ERROR, error});
export const removeCurrentError = error => ({type: actionTypes.REMOVE_CURRENT_ERROR});

export {
  changeMathInput,
  changeMathExpression,
  setRandomMathChainExpression,
  setRandomMathAddExpression,
  setRandomMathProdExpression,
  setRandomMathCommonExpression,
  setRandomMathInverseExpression,
  createChildMathTask,
  createChildMathTaskAndRedirect,
  setMathExpressionToParentTask,
  setMathExpressionToParentTaskAndRedirect,
  selectDiffTableItem,
} from './calculus';

export {
  setRandomBoolTableFormula,
  setRandomBoolEqualFormula,
  updateBoolTableAnswer,
  updateBoolEvalAnswer,
  setBoolChildTask,
  setBoolChildTaskAndRedirect,
  setBoolFormulaToParentTask,
  setBoolFormulaToParentTaskAndRedirect,
} from './bool';

export {
  setDoneEqual,
} from './set';

export {
  loadMoreTests,
  testStart,
  testNextQuestion,
  testAnswer,
  sendNewTest,
} from './tests';
