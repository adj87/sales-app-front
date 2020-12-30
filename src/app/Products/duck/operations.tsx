import { Dispatch } from 'react';
import { AxiosResponse } from 'axios';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetProductsAction, SetElementToCreateOrEditAction } from './types';
import { operations as customersOperations } from '../../Customers/duck';

import { IProduct } from './types/Product';

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchProducts = () => (dispatch: Dispatch<SetProductsAction>) => {
  api.fetchProducts().then((response: AxiosResponse<IProduct[]>) => {
    return dispatch(actions.setProducts(response.data));
  });
};

const fetchOrder = (type: string, orderId: Number) => (
  dispatch: Dispatch<SetElementToCreateOrEditAction>,
) => {
  api.fetchProducts(orderId).then((response: AxiosResponse<IProduct>) => {
    return dispatch(actions.setProductToCreateOrEdit(response.data));
  });
};

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setProductToCreateOrEdit(null));

const fetchCustomers = customersOperations.fetchCustomers;

export default { fetchProducts, fetchOrder, removeElementToCreateOrEdit, fetchCustomers };
