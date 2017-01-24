// @flow
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/posts';

export default function posts(state = [], action = {}) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return action.data;
    case DECREMENT_COUNTER:
      console.log('as');
      console.log(action);
      // return action.data;

      state = [
        // ...state,
        ...action.data
      ];
      return state;
    default:
      return state;
  }
}
