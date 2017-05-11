// @flow

export default function query(state = false, action = {}) {
  switch (action.type) {
    case "UPDATE_QUERY":
      return action.query
    default:
      return state;
  }
}
