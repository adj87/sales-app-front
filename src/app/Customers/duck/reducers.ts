import { SET_CUSTOMERS, CustomersState, SET_CUSTOMER_TO_CREATE_OR_EDIT } from './types';
import { AnyAction } from 'redux';

const initialState = {
  data: [],
  elementToCreateOrEdit: null,
};

const ordersReducer = (state = initialState, { type, payload }: AnyAction): CustomersState => {
  switch (type) {
    case SET_CUSTOMERS:
      return { ...state, data: payload };
    case SET_CUSTOMER_TO_CREATE_OR_EDIT:
      return { ...state, elementToCreateOrEdit: payload };
    default:
      return state;
  }
};

export default ordersReducer;
