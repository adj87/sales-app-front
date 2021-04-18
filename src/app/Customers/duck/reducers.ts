import {
  SET_CUSTOMERS,
  CustomersState,
  SET_CUSTOMER_TO_CREATE_OR_EDIT,
  SET_ROUTES,
  SET_PAYMENT_METHODS,
  SET_CHART_UNITS_BY_MONTH_PRODUCT_AND_CUSTOMER,
} from './types';
import { AnyAction } from 'redux';

const initialState = {
  data: [],
  elementToCreateOrEdit: null,
  paymentMethods: [],
  routes: [],
  chartUnitsByMonthProductAndCustomer: { data: [], products: [], last_data: [] },
};

const ordersReducer = (state = initialState, { type, payload }: AnyAction): CustomersState => {
  switch (type) {
    case SET_CUSTOMERS:
      return { ...state, data: payload };
    case SET_CUSTOMER_TO_CREATE_OR_EDIT:
      return { ...state, elementToCreateOrEdit: payload };
    case SET_ROUTES:
      return { ...state, routes: payload };
    case SET_PAYMENT_METHODS:
      return { ...state, paymentMethods: payload };
    case SET_CHART_UNITS_BY_MONTH_PRODUCT_AND_CUSTOMER:
      return { ...state, chartUnitsByMonthProductAndCustomer: payload };
    default:
      return state;
  }
};

export default ordersReducer;
