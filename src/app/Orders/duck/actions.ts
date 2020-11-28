import { SET_ORDERS } from './types';
import { Order } from '../mainInterfaces';
import { SetOrdersAction } from './types';

const setOrders = (orders: Order[]): SetOrdersAction => ({
  type: SET_ORDERS,
  payload: orders,
});

export default {
  setOrders,
};
