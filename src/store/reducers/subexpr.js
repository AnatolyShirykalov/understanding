import * as actionTypes from '../actions/actionTypes';
import {schemas} from '../../core/set/';
const reducer = (state={ex: schemas[0], moves: []}, action) => {
  switch(action.type){
    case actionTypes.SUB_EXPR_ADD_MOVE:
      const moves = action.move === 'up' ?
        state.moves.slice(0, state.moves.length - 1) :
        [...state.moves, action.move];
      return {...state, moves};
    default: return state;
  }
};

export default reducer;
