import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ordersReducer from '../app/Orders/duck';
import customersReducer from '../app/Customers/duck';
import productsReducer from '../app/Products/duck';
import loadingReducer from '../app/Loading/duck';
import faresReducer from '../app/Fares/duck';
import alertsReducer from '../app/Alerts/duck/reducers';
import configReducer from '../app/Config/duck/reducers';

const appReducer = combineReducers({
  orders: ordersReducer,
  customers: customersReducer,
  products: productsReducer,
  fares: faresReducer,
  pendingRequests: loadingReducer,
  alerts: alertsReducer,
  config: configReducer,
});

const middlewares = [thunk];

export default createStore(
  //@ts-ignore
  appReducer,
  compose(
    applyMiddleware(...middlewares),
    //@ts-ignore
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
