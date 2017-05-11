export function toggleFont(layoutState) {
  if (layoutState.font=="OLD_FONT") {
    return { type: "NEW_FONT"};
  }
  else {
    return { type: "OLD_FONT"};
  }
}
