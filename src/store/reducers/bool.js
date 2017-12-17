import * as actionTypes from '../actions/actionTypes';

const safeParseInt = v => v.length > 0 ? parseInt(v, 10) : v;

const reducer = (state={}, action) => {
  switch(action.type) {
    case actionTypes.SET_RANDOM_BOOL_TABLE_FORMULA:
    case actionTypes.SET_RANDOM_BOOL_EQUAL_FORMULA:
      return {
        ...state,
        [action.taskId]: {
          formula: action.formula,
        },
      };
    case actionTypes.UPDATE_BOOL_TABLE_ANSWER:
      return {
        ...state,
        [action.taskId]: {
          ...state[action.taskId],
          [action.index]: safeParseInt(action.value),
        }
      };
    case actionTypes.UPDATE_BOOL_EVAL_ANSWER:
      return {
        ...state,
        [action.taskId]: {
          ...state[action.taskId],
          answer: safeParseInt(action.value),
        },
      };
    case actionTypes.SET_BOOL_CHILD_TASK:
      return {
        ...state,
        [action.key]:{
          formula: action.formula,
          parentId: action.parentId,
          parentKind: action.parentKind,
          parentKey: action.parentKey,
        }
      }
    case actionTypes.SET_BOOL_FORMULA_TO_PARENT_TASK:
      return {
        ...state,
        [action.parentId]: {
          ...state[action.parentId],
          [action.parentKey]: action.formula,
        },
      };
    default: return state;
  }
}

export default reducer;
