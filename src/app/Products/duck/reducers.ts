import { SET_ORDERS, OrdersState, SET_ORDER_TO_CREATE_OR_EDIT } from './types';
import { AnyAction } from 'redux';

const initialState = {
  data: [],
  elementToCreateOrEdit: null,
};

const ordersReducer = (state = initialState, { type, payload }: AnyAction): OrdersState => {
  switch (type) {
    case SET_ORDERS:
      return { ...state, data: payload };
    case SET_ORDER_TO_CREATE_OR_EDIT:
      return { ...state, elementToCreateOrEdit: payload };
    default:
      return state;
  }
};

export default ordersReducer;
