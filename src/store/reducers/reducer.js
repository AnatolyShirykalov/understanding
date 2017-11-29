import * as actionTypes from '../actions/actionTypes';
const reducer = (state = {}, action) => {
  switch(action.type){
    case actionTypes.CHANGE_MATH_INPUT:
      return {...state, [action.inputId]: action.value};
    case actionTypes.CALCULUS_DIFF_TOGGLE_HINT:
      return {...state, showHint: !state.showHint};
    case actionTypes.CHANGE_MATH_EXPRESSION:
      return {expression: action.expression};
    default: return state;
  }
}

export default reducer;
