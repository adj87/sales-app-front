import { ICustomer, IPaymentMethod, IRoute } from './ICustomer';

const SECTION_CUSTOMERS = 'CUSTOMERS_';
export const SET_CUSTOMERS = SECTION_CUSTOMERS + 'SET_CUSTOMERS';
export const SET_CUSTOMER_TO_CREATE_OR_EDIT = SECTION_CUSTOMERS + 'SET_CUSTOMER_TO_CREATE_OR_EDIT';
export const SET_ROUTES = SECTION_CUSTOMERS + 'SET_ROUTES';
export const SET_PAYMENT_METHODS = SECTION_CUSTOMERS + 'SET_PAYMENT_METHODS';

export interface SetCustomersAction {
  type: typeof SET_CUSTOMERS;
  payload: ICustomer[];
}

export interface SetPaymentMethodsAction {
  type: typeof SET_PAYMENT_METHODS;
  payload: IPaymentMethod[];
}

export interface SetRoutesAction {
  type: typeof SET_ROUTES;
  payload: IRoute[];
}

export interface SetCustomerToCreateOrEditAction {
  type: typeof SET_CUSTOMER_TO_CREATE_OR_EDIT;
  payload: ICustomer | null;
}

export type CustomersActions = SetCustomersAction | SetCustomerToCreateOrEditAction;

export interface CustomersState {
  data: ICustomer[];
  elementToCreateOrEdit: ICustomer | null;
  paymentMethods: IPaymentMethod[];
  routes: IRoute[];
}
