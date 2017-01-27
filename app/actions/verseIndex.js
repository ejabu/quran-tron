// @flow
export const UPDATE = 'UPDATE';

function update(verseIndex) {
  return {
    type: UPDATE,
    verseIndex: verseIndex

  };
}

export function updateVerseIndex(dispatch, verseIndex) {
  dispatch(update(verseIndex));
}
