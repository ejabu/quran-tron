// @flow

export default function layout(state = {}, action = {}) {
  switch (action.type) {
    case "NEW_FONT":
      return Object.assign({}, state, {
        font: "NEW_FONT"
      })
    case "OLD_FONT":
      return Object.assign({}, state, {
        font: "OLD_FONT"
      })
    case "HIDE":
      return Object.assign({}, state, {
        submenu: "hide"
      })
    case "SHOW":
      return Object.assign({}, state, {
        submenu: "show"
      })
    default:
      return state;
  }
}
