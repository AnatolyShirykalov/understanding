import {SET_CURRENT_ERROR, REMOVE_CURRENT_ERROR} from '../actions/actionTypes';

const reducer = (state=null, {type, error}) => {
  switch(type) {
    case SET_CURRENT_ERROR: return error;
    case REMOVE_CURRENT_ERROR: return null;
    default: return state;
  }
}

export default reducer;

