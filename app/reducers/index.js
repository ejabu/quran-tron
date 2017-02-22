// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import verseIndex from './verseIndex';
import result from './result';

const rootReducer = combineReducers({
  verseIndex,
  result,
  routing
});

export default rootReducer;
