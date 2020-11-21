import types from './types';
import { Order } from '../interfaces';
import { SetOrdersAction } from './types';

const setOrders = (orders: Order[]): SetOrdersAction => ({
  type: types.SET_ORDERS,
  payload: orders,
});

export default {
  setOrders,
};
