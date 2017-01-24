// @flow
import { INCREMENT_COUNTER, QUERY_CHANGED, RESULT_CHANGED } from '../actions/suggestions';

export default function result(state = [], action = {}) {
  switch (action.type) {
    case RESULT_CHANGED:
      state = [
        // ...state,
        ...action.data
      ];
      return state;
    default:
      return state;
  }
}
