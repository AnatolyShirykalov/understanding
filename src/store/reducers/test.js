import * as actionTypes from '../actions/actionTypes';


const reducer = (state={data: null}, action) => {
  switch (action.type) {
    case actionTypes.TEST_START_STARTED:
      return {data: state.data, state: 'pending'};
    case actionTypes.TEST_START_SUCCESS:
      return {data: action.data};
    case actionTypes.TEST_START_ERROR:
      return {data: state.data, error: action.message};
    default: return state;
  }
}

export default reducer;

