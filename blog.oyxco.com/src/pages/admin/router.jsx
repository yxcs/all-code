import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import AboutPage from './about/AboutPage';
import HomePage from './home/HomePage';
import ListPage from './list/ListPage';

function AdminRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/admin/">
            <HomePage />
          </Route>
          <Route path="/admin/about">
            <AboutPage />
          </Route>
          <Route path="/admin/list">
            <ListPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AdminRouter;
