
export function hideMenu() {
  return { type: "HIDE"};
}
export function showMenu() {
  return { type: "SHOW"};
}
export function toggleFont(layoutState) {
  if (layoutState.font=="OLD_FONT") {
    return { type: "NEW_FONT"};
  }
  else {
    return { type: "OLD_FONT"};
  }
}
