import { OrdersActionsTypes, SET_ORDERS } from './types';

const ordersReducer = (state = [], action: OrdersActionsTypes) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ORDERS:
      return payload;
    default:
      return state;
  }
};

export default ordersReducer;
