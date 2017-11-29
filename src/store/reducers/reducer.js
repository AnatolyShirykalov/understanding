import * as actionTypes from '../actions/actionTypes';
const reducer = (state = {}, action) => {
  switch(action.type){
    case actionTypes.CHANGE_MATH_INPUT:
      return {...state, [action.inputId]: action.value};
    case actionTypes.CHANGE_MATH_EXPRESSION:
    case actionTypes.SET_RANDOM_MATH_EXPRESSION:
      return {expression: action.expression};
    default: return state;
  }
}

export default reducer;
