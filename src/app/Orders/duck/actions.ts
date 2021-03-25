import {
  SET_ORDERS,
  SetElementToCreateOrEditAction,
  SET_ORDER_TO_CREATE_OR_EDIT,
  SetOrdersAction,
  SetFareAction,
  SET_FARE,
  SetFareToInheritFromAction,
  SET_FARE_TO_INHERIT_FROM,
  SetCustomerAction,
  SET_CUSTOMER,
} from './types';
import { IOrder } from './types/Order';
import { IFare } from '../../Fares/duck/types/Fare';
import { ICustomer } from '../../Customers/duck/types/ICustomer';

const setOrders = (orders: IOrder[]): SetOrdersAction => ({
  type: SET_ORDERS,
  payload: orders,
});

const setFare = (fare: IFare | null): SetFareAction => ({
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

const setCustomer = (customer: ICustomer | null): SetCustomerAction => ({
  type: SET_CUSTOMER,
  payload: customer,
});

export default {
  setFare,
  setOrders,
  setCustomer,
  setOrderToCreateOrEdit,
  setFareToInheritFrom,
};
