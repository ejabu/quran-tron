// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import verseIndex from './verseIndex';
import result from './result';
import layout from './layout';
import font from './font';
import query from './query';

const rootReducer = combineReducers({
  verseIndex,
  result,
  layout,
  font,
  query,
  routing
});

export default rootReducer;
