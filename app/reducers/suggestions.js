// @flow
import { INCREMENT_COUNTER, QUERY_CHANGED } from '../actions/suggestions';

export default function suggestions(state = [], action = {}) {
  switch (action.type) {
    case QUERY_CHANGED:
      state = [
        // ...state,
        ...action.data
      ];
      return state;
    default:
      return state;
  }
}
