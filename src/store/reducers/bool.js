import * as actionTypes from '../actions/actionTypes';
const reducer = (state={}, action) => {
  switch(action.type) {
    case actionTypes.SET_RANDOM_BOOL_TABLE_FORMULA:
      return {
        ...state,
        [action.taskId]: {
          ...state[action.taskId],
          formula: action.formula,
          answer: Array(2**action.formula.vars.length).fill(''),
        }
      };
    case actionTypes.UPDATE_BOOL_TABLE_ANSWER:
      return {
        ...state,
        [action.taskId]: {
          ...state[action.taskId],
          answer: state[action.taskId].answer.map((value, index)=>
            index === action.index ? parseInt(action.value, 10) : value
          ),
        }
      };
    default: return state;
  }
}

export default reducer;
