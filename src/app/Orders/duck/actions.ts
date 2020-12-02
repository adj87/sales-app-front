import { SET_ORDERS, SetElementToCreateOrEditAction, SET_ORDER_TO_CREATE_OR_EDIT } from './types';
import { Order } from '../mainInterfaces';
import { SetOrdersAction } from './types';

const setOrders = (orders: Order[]): SetOrdersAction => ({
  type: SET_ORDERS,
  payload: orders,
});

const setOrderToCreateOrEdit = (order: Order | null): SetElementToCreateOrEditAction => ({
  type: SET_ORDER_TO_CREATE_OR_EDIT,
  payload: order,
});

export default {
  setOrders,
  setOrderToCreateOrEdit,
};
