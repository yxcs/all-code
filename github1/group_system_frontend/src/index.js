import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { browserHistory, hashHistory, Router, Route,IndexRoute } from 'react-router';
import appReducer from './reducer/index.js';
import App from './App';
import GroupManage from './components/GroupManage.jsx';
import ActivityPage from './components/ActivityPage.jsx';
import EditActivity from './components/EditActivity.jsx';
import H5Page from './components/H5Page';
import './index.css';

let store = createStore(appReducer);
console.log(store);
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={GroupManage}/>
          <Route path='/activity_page' component={ActivityPage}></Route>
          <Route path='/group_manage' component={GroupManage}></Route>
          <Route path='/activity_page/add' component={EditActivity}></Route>
          <Route path='/activity_page/edit/:id' component={EditActivity}></Route>
        </Route>
        <Route path='/h5/:id' component={H5Page}/>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
