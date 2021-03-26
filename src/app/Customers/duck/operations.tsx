import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';

import { Dispatch } from 'react';
import { SetCustomersAction, SetCustomerToCreateOrEditAction } from './types';
import { AxiosResponse } from 'axios';
import { ICustomer } from './types/ICustomer';
import { operations as loadingOperations } from '../../Loading/duck';
const { fetchOperationWithLoading, generalCreateOrEditOperation } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchCustomers = () => fetchOperationWithLoading(() => api.fetchCustomers(), actions.setCustomers);
const fetchCustomer = (customerId: string) => fetchOperationWithLoading(() => api.fetchCustomers(customerId), actions.setCustomerToCreateOrEdit);
const editCustomer = () => () => {
  console.log('hola');
};

const removeElementToCreateOrEdit = () => (dispatch: Dispatch<SetCustomerToCreateOrEditAction>) => dispatch(actions.setCustomerToCreateOrEdit(null));

export default { fetchCustomers, fetchCustomer, removeElementToCreateOrEdit, editCustomer };
