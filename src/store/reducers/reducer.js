import * as actionTypes from '../actions/actionTypes';
const reducer = (state = {}, action) => {
  if (action.type === actionTypes.CHANGE_MATH_INPUT) {
    return {...state, [action.inputId]: action.value};
  }
  if (action.type === actionTypes.CALCULUS_DIFF_TOGGLE_HINT) {
    return {...state, showHint: !state.showHint};
  }
  return state;
}

export default reducer;
