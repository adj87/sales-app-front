import { SET_CUSTOMERS, CustomersState, SET_CUSTOMER_TO_CREATE_OR_EDIT, SET_ROUTES, SET_PAYMENT_METHODS } from './types';
import { AnyAction } from 'redux';

const initialState = {
  data: [],
  elementToCreateOrEdit: null,
  paymentMethods: [],
  routes: [],
};

const ordersReducer = (state = initialState, { type, payload }: AnyAction): CustomersState => {
  switch (type) {
    case SET_CUSTOMERS:
      return { ...state, data: payload };
    case SET_CUSTOMER_TO_CREATE_OR_EDIT:
      return { ...state, elementToCreateOrEdit: payload };
    case SET_ROUTES:
      return { ...state, routes: payload };
    case SET_PAYMENT_METHODS:
      return { ...state, paymentMethods: payload };
    default:
      return state;
  }
};

export default ordersReducer;
