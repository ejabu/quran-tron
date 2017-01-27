// @flow
import { UPDATE } from '../actions/verseIndex';

export default function counter(state: number = 0, action: Object) {
  switch (action.type) {
    case UPDATE:
      return action.verseIndex
    default:
      return state
  }
}
