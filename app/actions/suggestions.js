// @flow
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const QUERY_CHANGED = 'QUERY_CHANGED';
export const RESULT_CHANGED = 'RESULT_CHANGED';


function queryChangedAction(array2) {
  return { type: QUERY_CHANGED, data: array2 };
}
function resultChangedAction(array2) {
  return { type: RESULT_CHANGED, data: array2 };
}

export function queryChanged(dispatch) {
  const random = () => {
    const randomVal = Math.floor(Math.random() * 4);
    return randomVal;
  };
  const index = 4;
  const url = `http://uinames.com/api/?amount=${index}`;
  fetch(url).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  }).then((stories) => {
    dispatch(queryChangedAction(stories));
    return true;
  }).catch((errors) => {
    console.log('ERROR', errors);
  });
}

export function resultChanged(dispatch, query) {
  console.log(query);
  const random = () => {
    const randomVal = Math.floor(Math.random() * 4);
    return randomVal;
  };
  const index = 10;
  const url = `http://uinames.com/api/?amount=${index}`;
  fetch(url).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  }).then((stories) => {
    dispatch(resultChangedAction(stories));
    return true;
  }).catch((errors) => {
    console.log('ERROR', errors);
  });
}
