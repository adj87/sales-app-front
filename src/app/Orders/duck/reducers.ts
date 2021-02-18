import { SET_ORDERS, OrdersState, SET_ORDER_TO_CREATE_OR_EDIT, SET_FARE_TO_INHERIT_FROM, SET_FARE, SET_CUSTOMER } from './types';
import { AnyAction } from 'redux';

const initialState = {
  data: [],
  elementToCreateOrEdit: null,
  fare: null,
  fareToInheritFrom: null,
  customer: null,
};

const ordersReducer = (state = initialState, { type, payload }: AnyAction): OrdersState => {
  switch (type) {
    case SET_ORDERS:
      return { ...state, data: payload };
    case SET_ORDER_TO_CREATE_OR_EDIT:
      return { ...state, elementToCreateOrEdit: payload };
    case SET_FARE:
      return { ...state, fare: payload };
    case SET_FARE_TO_INHERIT_FROM:
      return { ...state, fareToInheritFrom: payload };
    case SET_CUSTOMER:
      return { ...state, customer: payload };
    default:
      return state;
  }
};

export default ordersReducer;
