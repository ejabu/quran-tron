// @flow
import { INCREMENT_COUNTER, QUERY_CHANGED, RESULT_CHANGED } from '../actions/suggestions';

export default function result(state = [], action = {}) {
  console.log('result REDUCER');
  console.log(action);
  switch (action.type) {
    case RESULT_CHANGED:
      state = [
        // ...state,
        ...action.data
      ];
      return state;
    case 'UPDATE_SEARCH':
      console.log('UPDATE_SEARCH result REDUCER');
      state = [
        // ...state,
        ...action.data
      ];
      return state;
    default:
      return state;
  }
}
