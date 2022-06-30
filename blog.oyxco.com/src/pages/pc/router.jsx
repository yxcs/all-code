import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import AboutPage from './about/AboutPage';
import HomePage from './home/HomePage';
import ListPage from './list/ListPage';
import ArticlePage from './article/ArticlePage';

function PcRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/list/:type">
            <ListPage />
          </Route>
          <Route path="/art/:id">
            <ArticlePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default PcRouter;
