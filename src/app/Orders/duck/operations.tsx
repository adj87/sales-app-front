import { Dispatch } from 'react';
import { AxiosResponse } from 'axios';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetOrdersAction, SetElementToCreateOrEditAction } from './types';
import { operations as customersOperations } from '../../Customers/duck';
import { operations as productsOperations } from '../../Products/duck';
import { operations as loadingOperations } from '../../Loading/duck';

import { IOrder } from './types/Order';

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;
const { fetchOperationWithLoading } = loadingOperations;

const fetchOrders = () => fetchOperationWithLoading(() => api.fetchOrders(), actions.setOrders);

const fetchOrder = (orderIdAndType: string) => {
  const [type, orderId] = orderIdAndType.split('-');
  return fetchOperationWithLoading(
    () => api.fetchOrders(type, parseInt(orderId)),
    actions.setOrderToCreateOrEdit,
  );
};

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setOrderToCreateOrEdit(null));

const fetchCustomers = customersOperations.fetchCustomers;
const fetchProducts = productsOperations.fetchProducts;
const setOrderToCreateOrEdit = actions.setOrderToCreateOrEdit;

export default {
  fetchOrders,
  fetchOrder,
  removeElementToCreateOrEdit,
  fetchCustomers,
  fetchProducts,
  setOrderToCreateOrEdit,
};
