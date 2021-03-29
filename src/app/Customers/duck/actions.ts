import {
  SET_CUSTOMERS,
  SetCustomerToCreateOrEditAction,
  SET_CUSTOMER_TO_CREATE_OR_EDIT,
  SetCustomersAction,
  SetRoutesAction,
  SetPaymentMethodsAction,
  SET_PAYMENT_METHODS,
  SET_ROUTES,
} from './types';
import { ICustomer, IRoute, IPaymentMethod } from './types/ICustomer';

const setCustomers = (orders: ICustomer[]): SetCustomersAction => ({
  type: SET_CUSTOMERS,
  payload: orders,
});

const setCustomerToCreateOrEdit = (order: ICustomer | null): SetCustomerToCreateOrEditAction => ({
  type: SET_CUSTOMER_TO_CREATE_OR_EDIT,
  payload: order,
});

const setRoutes = (routes: IRoute[]): SetRoutesAction => ({
  type: SET_ROUTES,
  payload: routes,
});

const setPaymentMethods = (payments: IPaymentMethod[]): SetPaymentMethodsAction => ({
  type: SET_PAYMENT_METHODS,
  payload: payments,
});

export default {
  setCustomers,
  setCustomerToCreateOrEdit,
  setRoutes,
  setPaymentMethods,
};
