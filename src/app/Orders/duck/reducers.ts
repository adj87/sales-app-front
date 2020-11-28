import { OrdersActionsTypes, SET_ORDERS, OrdersState } from './types';

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action: OrdersActionsTypes): OrdersState => {
  const { type, payload } = action;
  switch (type) {
    case SET_ORDERS:
      return { ...state, orders: payload };
    default:
      return state;
  }
};

export default ordersReducer;
