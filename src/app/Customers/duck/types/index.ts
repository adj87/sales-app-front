import { ICustomer } from './Customer';

const SECTION_CUSTOMERS = 'CUSTOMERS_';
export const SET_CUSTOMERS = SECTION_CUSTOMERS + 'SET_CUSTOMERS';
export const SET_CUSTOMER_TO_CREATE_OR_EDIT = SECTION_CUSTOMERS + 'SET_CUSTOMER_TO_CREATE_OR_EDIT';

export interface SetCustomersAction {
  type: typeof SET_CUSTOMERS;
  payload: ICustomer[];
}

export interface SetCustomerToCreateOrEditAction {
  type: typeof SET_CUSTOMER_TO_CREATE_OR_EDIT;
  payload: ICustomer | null;
}

export type CustomersActions = SetCustomersAction | SetCustomerToCreateOrEditAction;

export interface CustomersState {
  data: ICustomer[];
  elementToCreateOrEdit: ICustomer | null;
}
