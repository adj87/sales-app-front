import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ordersReducer from '../app/Orders/duck';
import customersReducer from '../app/Customers/duck';

const appReducer = combineReducers({ orders: ordersReducer, customers: customersReducer });

const middlewares = [thunk];

export default createStore(
  //@ts-ignore
  appReducer,
  compose(
    applyMiddleware(...middlewares),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
