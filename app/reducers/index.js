// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import verseIndex from './verseIndex';
import result from './result';
import layout from './layout';
import font from './font';

const rootReducer = combineReducers({
  verseIndex,
  result,
  layout,
  font,
  routing
});

export default rootReducer;
