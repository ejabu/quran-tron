// @flow
export const WORD_CHANGED = 'WORD_CHANGED';
export const WORD_ADDED = 'WORD_ADDED';


function wordChangedAction(stories) {
  return { type: WORD_CHANGED, data: stories };
}
function wordAdded(stories) {
  return { type: WORD_ADDED, data: stories };
}

export function wordChanged(dispatch, from, to, word) {
  console.log('wordd');
  // const url = `http://localhost:5000/synonym/${word}`;
  const url = `http://localhost:5000/trans/${from}/${to}/${word}`;

  console.log('url');
  console.log(url);
  // const url = 'http://localhost:5000/users';
  // const url = `http://uinames.com/api/?amount=${word}`;
  fetch(url).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  }).then((stories) => {
    console.log(stories);
    dispatch(wordChangedAction(stories.reverse()));
    return true;
  }).catch((errors) => {
    console.log('ERROR', errors);
  });
}

export function meanNew(dispatch, from, to, word, mean) {
  // const url = `http://localhost:5000/synonym/${word}`;
  dispatch(wordAdded([mean]));


  const url = `http://localhost:5000/add/${from}/${to}/${word}/${mean}`;

  console.log('url');
  console.log(url);
  // const url = 'http://localhost:5000/users';
  // const url = `http://uinames.com/api/?amount=${word}`;
  fetch(url).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  }).then((stories) => {
    console.log(stories);
    // dispatch(wordChangedAction(stories));
    return true;
  }).catch((errors) => {
    console.log('ERROR', errors);
  });
}
