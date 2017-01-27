// @flow
export const UPDATE = 'UPDATE';

export function increment(verseIndex) {
  return {
    type: UPDATE,
    verseIndex: verseIndex

  };
}

export function updateVerseIndex(verseIndex) {
  return (dispatch: Function) => {
    dispatch(increment(verseIndex));
  };
}
