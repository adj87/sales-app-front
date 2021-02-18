import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';

import { Dispatch } from 'react';
import { SetCustomersAction, SetCustomerToCreateOrEditAction } from './types';
import { AxiosResponse } from 'axios';
import { ICustomer } from './types/Customer';

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchCustomers = () => (dispatch: Dispatch<SetCustomersAction>) => {
  api.fetchCustomers().then((response: AxiosResponse<ICustomer[]>) => {
    return dispatch(actions.setCustomers(response.data));
  });
};

const fetchCustomer = (orderId: number) => (dispatch: Dispatch<SetCustomerToCreateOrEditAction>) => {
  api.fetchCustomers(orderId).then((response: AxiosResponse<ICustomer>) => {
    return dispatch(actions.setOrderToCreateOrEdit(response.data));
  });
};

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetCustomerToCreateOrEditAction>) => dispatch(actions.setOrderToCreateOrEdit(null));

export default { fetchCustomers, fetchCustomer, removeElementToCreateOrEdit };
