// @flow

export default function layout(state = {}, action = {}) {
  switch (action.type) {
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
