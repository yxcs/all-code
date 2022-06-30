import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import AboutPage from './about/AboutPage';
import HomePage from './home/HomePage';
import ListPage from './list/ListPage';

function MobileRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/mobile/">
            <HomePage />
          </Route>
          <Route path="/mobile/about">
            <AboutPage />
          </Route>
          <Route path="/mobile/list">
            <ListPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default MobileRouter;
