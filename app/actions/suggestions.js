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
