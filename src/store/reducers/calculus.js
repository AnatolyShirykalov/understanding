import * as actionTypes from '../actions/actionTypes';
const reducer = (state = {}, action) => {
  switch(action.type){
    case actionTypes.CHANGE_MATH_INPUT:
      return {...state, [action.taskId]: {
        ...state[action.taskId],
        [action.inputId]: action.value
      }};
    case actionTypes.CHANGE_MATH_EXPRESSION:
    case actionTypes.SET_RANDOM_MATH_CHAIN_EXPRESSION:
    case actionTypes.SET_RANDOM_MATH_ADD_EXPRESSION:
    case actionTypes.SET_RANDOM_MATH_PROD_EXPRESSION:
    case actionTypes.SET_RANDOM_MATH_COMMON_EXPRESSION:
      return {
        ...state,
        [action.taskId]: {expression: action.expression}
      };
    case actionTypes.CREATE_CHILD_MATH_TASK:
      return {...state,
        [action.key]: {
          expression: action.expression,
          parentId: action.parentId,
          parentKind: action.parentKind,
          parentInputId: action.parentInputId
        }
      };
    case actionTypes.SET_MATH_EXPRESSION_TO_PARENT_TASK:
      return {...state,
        [action.parentId]: {
          ...state[action.parentId],
          [action.parentInputId]: action.expression,
        }
      }
    case actionTypes.SELECT_DIFF_TABLE_ITEM:
      return {...state,
        [action.taskId]: {...state[action.taskId], fun: action.fun},
      };
    default: return state;
  }
}

export default reducer;
