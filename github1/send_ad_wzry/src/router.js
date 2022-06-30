import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Account from './routes/acount/Account';
import Groups from './routes/groups/groups';
import Details from './routes/details/details';
import TagManager from './routes/tags/TagManager';
import Videos from './routes/videos/Videos';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} >
        <IndexRoute component={Account} />
        <Route path='account' component={Account} />
        <Route path='groups' component={Groups} />
        <Route path='details/:wxid/:id' component={Details} />
        <Route path='tags' component={TagManager} />
        <Route path='videos' component={Videos} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
