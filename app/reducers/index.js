// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import verseIndex from './verseIndex';
import result from './result';
import layout from './layout';

const rootReducer = combineReducers({
  verseIndex,
  result,
  layout,
  routing
});

export default rootReducer;
