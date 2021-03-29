import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';

import { Dispatch } from 'react';
import { SetCustomerToCreateOrEditAction } from './types';

import { operations as loadingOperations } from '../../Loading/duck';
import { defaultValues } from '../constants';
import { ICustomer } from './types/ICustomer';
const { fetchOperationWithLoading, generalCreateOrEditOperation } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchCustomers = () => fetchOperationWithLoading(() => api.fetchCustomers(), actions.setCustomers);
const fetchPaymentMethods = () => fetchOperationWithLoading(() => api.fetchPaymentsMethods(), actions.setPaymentMethods);
const fetchRoutes = () => fetchOperationWithLoading(() => api.fetchRoutes(), actions.setRoutes);
const fetchCustomer = (customerId?: string) => {
  if (customerId) {
    return fetchOperationWithLoading(() => api.fetchCustomers(customerId), actions.setCustomerToCreateOrEdit);
  } else {
    return (dispatch: Dispatch<any>) => dispatch(actions.setCustomerToCreateOrEdit(defaultValues));
  }
};

const createCustomer = (c: ICustomer, cb: Function) =>
  generalCreateOrEditOperation(
    () => api.createCustomer(c),
    (res: any, dispatch: any) => {
      dispatch(fetchCustomers());
      cb(); // this cb is for closing the modal
    },
  );

const editCustomer = (c: ICustomer, cb: Function) =>
  generalCreateOrEditOperation(
    () => api.editCustomer(c),
    (res: any, dispatch: any) => {
      dispatch(fetchCustomers());
      cb(); // this cb is for closing the modal
    },
  );

const removeElementToCreateOrEdit = () => (dispatch: Dispatch<SetCustomerToCreateOrEditAction>) => dispatch(actions.setCustomerToCreateOrEdit(null));

export default { fetchCustomers, fetchCustomer, removeElementToCreateOrEdit, editCustomer, createCustomer, fetchPaymentMethods, fetchRoutes };
