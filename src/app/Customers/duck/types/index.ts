import { ICustomer, IPaymentMethod, IRoute, IChartUnitsByMonthProductAndCustomer } from './ICustomer';

const SECTION_CUSTOMERS = 'CUSTOMERS_';
export const SET_CUSTOMERS = SECTION_CUSTOMERS + 'SET_CUSTOMERS';
export const SET_CUSTOMER_TO_CREATE_OR_EDIT = SECTION_CUSTOMERS + 'SET_CUSTOMER_TO_CREATE_OR_EDIT';
export const SET_ROUTES = SECTION_CUSTOMERS + 'SET_ROUTES';
export const SET_PAYMENT_METHODS = SECTION_CUSTOMERS + 'SET_PAYMENT_METHODS';
export const SET_CHART_UNITS_BY_MONTH_PRODUCT_AND_CUSTOMER = SECTION_CUSTOMERS + 'SET_CHART_UNITS_BY_MONTH_PRODUCT_AND_CUSTOMER';

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

export interface SetChartUnitsByMonthProductAndCustomer {
  type: typeof SET_CHART_UNITS_BY_MONTH_PRODUCT_AND_CUSTOMER;
  payload: IChartUnitsByMonthProductAndCustomer[];
}

export type CustomersActions = SetCustomersAction | SetCustomerToCreateOrEditAction | SetChartUnitsByMonthProductAndCustomer;

export interface CustomersState {
  data: ICustomer[];
  elementToCreateOrEdit: ICustomer | null;
  paymentMethods: IPaymentMethod[];
  routes: IRoute[];
  chartUnitsByMonthProductAndCustomer: IChartUnitsByMonthProductAndCustomer;
}
