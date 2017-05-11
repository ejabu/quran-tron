// @flow

export default function font(state = {}, action = {}) {
  switch (action.type) {
    case "NEW_FONT":
      return Object.assign({}, state, {
        font: "NEW_FONT"
      })
    case "OLD_FONT":
      return Object.assign({}, state, {
        font: "OLD_FONT"
      })
    default:
      return state;
  }
}
