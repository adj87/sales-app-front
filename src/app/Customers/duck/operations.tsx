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

const fetchCustomers = (customerId?: string) => fetchOperationWithLoading(() => api.fetchCustomers(customerId), actions.setCustomers);

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetCustomerToCreateOrEditAction>) => dispatch(actions.setOrderToCreateOrEdit(null));

export default { fetchCustomers, removeElementToCreateOrEdit };
