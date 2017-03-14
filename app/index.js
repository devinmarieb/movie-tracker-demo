import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import allReducers from './reducers/index';
import {Provider} from 'react-redux';

import App from './containers/App-container';
import AllMovies from './containers/AllMovies-container';
import FavMovies from './containers/FavMovies-container';
import Login from './components/Login';


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(allReducers, devTools);

const router = (
  <Provider store = {store}>
    <Router history={hashHistory} >
      <Route path='/' component={App}>
        <IndexRoute component={AllMovies} />
        <Route path='/login' component={Login} />
        <Route path='/favorites' component={FavMovies} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('main'))
