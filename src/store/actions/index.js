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
} from './tests';
