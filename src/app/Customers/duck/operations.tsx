import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';

import { Dispatch } from 'react';
import { SetCustomerToCreateOrEditAction } from './types';

import { operations as loadingOperations } from '../../Loading/duck';
const { fetchOperationWithLoading, generalCreateOrEditOperation } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchCustomers = () => fetchOperationWithLoading(() => api.fetchCustomers(), actions.setCustomers);
const fetchPaymentMethods = () => fetchOperationWithLoading(() => api.fetchPaymentsMethods(), actions.setPaymentMethods);
const fetchRoutes = () => fetchOperationWithLoading(() => api.fetchRoutes(), actions.setRoutes);
const fetchCustomer = (customerId: string) => fetchOperationWithLoading(() => api.fetchCustomers(customerId), actions.setCustomerToCreateOrEdit);
const editCustomer = () => () => {
  console.log('hola');
};

const removeElementToCreateOrEdit = () => (dispatch: Dispatch<SetCustomerToCreateOrEditAction>) => dispatch(actions.setCustomerToCreateOrEdit(null));

export default { fetchCustomers, fetchCustomer, removeElementToCreateOrEdit, editCustomer, fetchPaymentMethods, fetchRoutes };
