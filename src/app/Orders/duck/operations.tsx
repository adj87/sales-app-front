import { Dispatch } from 'react';

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

const fetchOrdersAndProducts = () =>
  fetchOperationWithLoading(
    () => Promise.all([apiOrders.fetchOrders(), productsApi.fetchProducts()]),
    [actions.setOrders, productsAction.setProducts],
  );

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setOrderToCreateOrEdit(null));

const fetchOrderAndCustomersAndFaresAndProducts = (orderIdAndType: string) => {
  const [type, orderId] = orderIdAndType.split('-');
  return fetchOperationWithLoading(
    () =>
      Promise.all([
        customersApi.fetchCustomers(),
        faresApi.fetchFares(),
        productsApi.fetchProducts(),
        apiOrders.fetchOrders(type, parseInt(orderId)),
      ]),
    [
      customersAction.setCustomers,
      faresAction.setFares,
      productsAction.setProducts,
      actions.setOrderToCreateOrEdit,
    ],
  );
};

const setOrderToCreateOrEdit = actions.setOrderToCreateOrEdit;

export default {
  fetchOrdersAndProducts,
  removeElementToCreateOrEdit,
  fetchOrderAndCustomersAndFaresAndProducts,
  setOrderToCreateOrEdit,
};
