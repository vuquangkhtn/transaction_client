import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Routes from './routes';
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers/index.js';
require('./favicon.ico');

const store = createStore(rootReducer,applyMiddleware(logger))
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router routes={Routes} history={browserHistory} />
      </Provider>
    );
  }
}

export default App;
