// @flow
import { WORD_CHANGED, WORD_ADDED } from '../actions/translations';

export default function translations(state = [], action = {}) {
  switch (action.type) {
    case WORD_CHANGED:
      state = [
        // ...state,
        ...action.data
      ];
      return state;
    case WORD_ADDED:
      state = [
        ...state,
        ...action.data
      ];
      return state;
    default:
      return state;
  }
}
