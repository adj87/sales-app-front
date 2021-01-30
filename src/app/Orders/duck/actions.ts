import {
  SET_ORDERS,
  SetElementToCreateOrEditAction,
  SET_ORDER_TO_CREATE_OR_EDIT,
  SetOrdersAction,
  SetFareAction,
  SET_FARE,
  SetFareToInheritFromAction,
  SET_FARE_TO_INHERIT_FROM,
} from './types';
import { IOrder } from './types/Order';
import { IFare } from '../../Fares/duck/types/Fare';

const setOrders = (orders: IOrder[]): SetOrdersAction => ({
  type: SET_ORDERS,
  payload: orders,
});

const setFare = (fare: IFare): SetFareAction => ({
  type: SET_FARE,
  payload: fare,
});

const setOrderToCreateOrEdit = (order: IOrder | null): SetElementToCreateOrEditAction => ({
  type: SET_ORDER_TO_CREATE_OR_EDIT,
  payload: order,
});

const setFareToInheritFrom = (fare: IFare | null): SetFareToInheritFromAction => ({
  type: SET_FARE_TO_INHERIT_FROM,
  payload: fare,
});

export default {
  setFare,
  setOrders,
  setOrderToCreateOrEdit,
  setFareToInheritFrom,
};
