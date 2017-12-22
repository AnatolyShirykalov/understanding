import * as actionTypes from '../actions/actionTypes';
const reducer = (state={bool: []}, action) => {
  switch(action.type) {
    case actionTypes.SET_BOOL_FORMULA_TO_PARENT_TASK:
      if(action.parentId !== 'lessoninit') return state;
      return {
        ...state,
        ...{
          bool: [
            ...state.bool,
            action.parentKey
          ].sort(),
        }
      };
    case actionTypes.SET_DONE_EQUAL:
      return {
        ...state,
        set: [...state.set, action.exs],
      }
    default: return state;
  }
}

export default reducer;
