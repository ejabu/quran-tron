// @flow
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/posts2';

const update = (state, mutations) =>
  Object.assign({}, state, mutations);

export const INITIAL_STATE = {
  value: 0,
  warning: false
};

export default function posts2(state = INITIAL_STATE, action: Object) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state;
    case DECREMENT_COUNTER:
      state = update(state, { value: state.value + 1 });
      return state;
    default:
      return state;
  }
}
