import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import allReducers from './reducers';

import App from './App';

// const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(allReducers, compose(applyMiddleware(thunk), /*composeEnchancers*/));

ReactDOM.render(
  <Router>
    <Provider store={ store }>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);