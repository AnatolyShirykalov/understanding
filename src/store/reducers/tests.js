import * as actionTypes from '../actions/actionTypes';

const reducer = (state={data: []}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_MORE_TESTS_STARTED:
      return {data: [...state.data], state: 'pending'};
    case actionTypes.LOAD_MORE_TESTS_SUCCESS:
      return {
        data: [...state.data, ...action.data],
      };
    case actionTypes.LOAD_MORE_TESTS_ERROR:
      return {data: [...state.data], error: action.message};
    default: return state;
  }
}

export default reducer;
