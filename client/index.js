require('./assets/styles/app.scss');
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { AppRoute } from './routes';
import { AppReducer } from './reducers';
// import { apiMiddleware } from './middlewares';
import thunk from 'redux-thunk';

const initStore = (reducers, state) => {
    return createStore(reducers, state, applyMiddleware(thunk));
};

const store = initStore(AppReducer, window.__INITIAL_STATE__);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={AppRoute} />
    </Provider>
    , document.getElementById('app')
);
