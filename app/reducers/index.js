// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import posts from './posts';
import posts2 from './posts2';
import suggestions from './suggestions';
import translations from './translations';
import result from './result';

const rootReducer = combineReducers({
  counter,
  posts,
  posts2,
  suggestions,
  translations,
  result,
  routing
});

export default rootReducer;
