import { Dispatch } from 'react';
import Axios from 'axios';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetElementToCreateOrEditAction } from './types';

import { actions as customersAction, api as customersApi } from '../../Customers/duck';
import { actions as faresAction, api as faresApi } from '../../Fares/duck';
import { actions as productsAction, api as productsApi } from '../../Products/duck';

import { operations as loadingOperations } from '../../Loading/duck';

const apiOrders = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const { fetchOperationWithLoading } = loadingOperations;

const fetchOrders = () =>
  fetchOperationWithLoading(() => apiOrders.fetchOrders(), actions.setOrders);

const fetchOrder = (orderIdAndType: string) => {
  const [type, orderId] = orderIdAndType.split('-');
  return fetchOperationWithLoading(
    () => apiOrders.fetchOrders(type, parseInt(orderId)),
    actions.setOrderToCreateOrEdit,
  );
};

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setOrderToCreateOrEdit(null));

const fetchCustomersAndFaresAndProducts = () =>
  fetchOperationWithLoading(
    () =>
      Promise.all([
        customersApi.fetchCustomers(),
        faresApi.fetchFares(),
        productsApi.fetchProducts(),
      ]),
    [customersAction.setCustomers, faresAction.setFares, productsAction.setProducts],
  );

console.log(customersApi);

const setOrderToCreateOrEdit = actions.setOrderToCreateOrEdit;

export default {
  fetchOrders,
  fetchOrder,
  removeElementToCreateOrEdit,
  fetchCustomersAndFaresAndProducts,
  setOrderToCreateOrEdit,
};
