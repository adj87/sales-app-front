import { Dispatch } from 'react';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetElementToCreateOrEditAction } from './types';
import { actions as customersAction, api as customersApi } from '../../Customers/duck';
import { actions as faresAction, api as faresApi } from '../../Fares/duck';
import { actions as productsAction, api as productsApi } from '../../Products/duck';
import { operations as loadingOperations } from '../../Loading/duck';
import { defaultValues } from '../constants';

const apiOrders = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const { fetchOperationWithLoading } = loadingOperations;

const fetchOrdersAndProducts = () =>
  fetchOperationWithLoading(
    () => Promise.all([apiOrders.fetchOrders(), productsApi.fetchProducts()]),
    [actions.setOrders, productsAction.setProducts],
  );

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setOrderToCreateOrEdit(null));

const fetchOrderAndCustomersAndFareAndProductsAndFares = (orderIdAndType: string, customerId?: number) => {
  const [type, orderId] = orderIdAndType.split('-');

  const setOfRequests: any = {
    customers: () => customersApi.fetchCustomers(),
    fare: () => faresApi.fetchFares(customerId),
    order: () => apiOrders.fetchOrders(type, parseInt(orderId)),
    fares: () => faresApi.fetchFares()
  };

  const setOfActions: any = {
    customers: customersAction.setCustomers,
    fare: actions.setFare,
    order: actions.setOrderToCreateOrEdit,
    fares:faresAction.setFares
  };

  if (orderIdAndType === 'new') {
    delete setOfRequests.order;
    delete setOfActions.order;
    delete setOfRequests.fare;
    delete setOfActions.fare;
  }

  return fetchOperationWithLoading(
    () => Promise.all(Object.values(setOfRequests).map((req: any) => req())),
    Object.values(setOfActions),
    (res: any, dispatch: any) => {
      if (orderIdAndType === 'new') {
        dispatch(actions.setOrderToCreateOrEdit(defaultValues));
      }
    },
  );
};

const setFareToInheritFrom = actions.setFareToInheritFrom;

const setOrderToCreateOrEdit = actions.setOrderToCreateOrEdit;

const fetchFareWithCb = (idCustomerFare: number, cb: Function) =>
  fetchOperationWithLoading(() => faresApi.fetchFares(idCustomerFare), null, cb);

export default {
  fetchOrdersAndProducts,
  removeElementToCreateOrEdit,
  fetchOrderAndCustomersAndFareAndProductsAndFares,
  setOrderToCreateOrEdit,
  setFareToInheritFrom,
  fetchFareWithCb,
};
