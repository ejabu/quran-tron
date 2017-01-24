// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import QamusPage from './containers/QamusPage';
import DocPage from './containers/DocPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/counter" component={CounterPage} />
    <Route path="/qamus" component={QamusPage} />
    <Route path="/doc" component={DocPage} />
  </Route>
);
