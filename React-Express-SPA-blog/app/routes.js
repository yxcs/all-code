// import 'babel-polyfill'
import React from 'react'
import { Redirect, Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

// import components
import App from './containers/App.js'
import Home from './components/Home/Home.js'
import NotFound from './components/NotFound/NotFound.js'

import rootReducer from './reducers/index.js'
import configureStore from './store/configureStore.js'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// route
const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/home"component={App}>
        <IndexRoute component={Home} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>
)

export default router

