import * as actionTypes from '../actions/actionTypes';
const reducer = (state = {}, action) => {
  switch(action.type){
    case actionTypes.CHANGE_MATH_INPUT:
      return {...state, [action.taskId]: {
        ...state[action.taskId],
        [action.inputId]: action.value
      }};
    case actionTypes.CHANGE_MATH_EXPRESSION:
    case actionTypes.SET_RANDOM_MATH_EXPRESSION:
      return {
        ...state,
        [action.taskId]: {expression: action.expression}
      };
    case actionTypes.CREATE_CHILD_MATH_TASK:
      return {...state,
        [action.key]: {
          expression: action.expression,
          parentId: action.parentId,
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
    default: return state;
  }
}

export default reducer;
