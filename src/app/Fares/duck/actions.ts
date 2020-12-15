import {
  SET_ORDERS,
  SetElementToCreateOrEditAction,
  SET_ORDER_TO_CREATE_OR_EDIT,
  SetOrdersAction,
} from './types';
import { IOrder } from './types/Fare';

const setOrders = (orders: IOrder[]): SetOrdersAction => ({
  type: SET_ORDERS,
  payload: orders,
});

const setOrderToCreateOrEdit = (order: IOrder | null): SetElementToCreateOrEditAction => ({
  type: SET_ORDER_TO_CREATE_OR_EDIT,
  payload: order,
});

export default {
  setOrders,
  setOrderToCreateOrEdit,
};
