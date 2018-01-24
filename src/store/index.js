import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import reducer from '../reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = [thunk];

const logger = createLogger({
  collapsed: true,
});

if (process.env.NODE_ENV === 'development') {
  enhancer.push(logger);
}

const store = createStore(reducer, composeEnhancers(applyMiddleware(...enhancer), persistState()));

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
