import { SET_CUSTOMERS, SetCustomerToCreateOrEditAction, SET_CUSTOMER_TO_CREATE_OR_EDIT, SetCustomersAction } from './types';
import { ICustomer } from './types/ICustomer';

const setCustomers = (orders: ICustomer[]): SetCustomersAction => ({
  type: SET_CUSTOMERS,
  payload: orders,
});

const setOrderToCreateOrEdit = (order: ICustomer | null): SetCustomerToCreateOrEditAction => ({
  type: SET_CUSTOMER_TO_CREATE_OR_EDIT,
  payload: order,
});

export default {
  setCustomers,
  setOrderToCreateOrEdit,
};
