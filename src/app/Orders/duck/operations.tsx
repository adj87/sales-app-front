import { Dispatch } from 'react';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetElementToCreateOrEditAction } from './types';
import { actions as customersAction, api as customersApi } from '../../Customers/duck';
import { actions as faresAction, api as faresApi, operations as fareOperations } from '../../Fares/duck';
import { actions as productsAction, api as productsApi } from '../../Products/duck';
import { operations as loadingOperations } from '../../Loading/duck';
import { defaultValues } from '../constants';
import { IFare } from '../../Fares/duck/types/Fare';
import { IOrder } from './types/Order';

const apiOrders = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const { fetchOperationWithLoading, generalCreateOrEditOperation } = loadingOperations;

const fetchOrders = () => fetchOperationWithLoading(apiOrders.fetchOrders, actions.setOrders);
const fetchOrder = (orderIdAndType: string) => {
  if (orderIdAndType) {
    const [type, orderId] = orderIdAndType.split('-');
    return fetchOperationWithLoading(() => apiOrders.fetchOrders(type, parseInt(orderId)), actions.setOrderToCreateOrEdit);
  }
  return (dispatch: Dispatch<any>) => dispatch(actions.setOrderToCreateOrEdit(defaultValues));
};
const fetchFares = () => fetchOperationWithLoading(faresApi.fetchFares, faresAction.setFares);
const fetchProducts = () => fetchOperationWithLoading(productsApi.fetchProducts, productsAction.setProducts);
const fetchCustomers = () => fetchOperationWithLoading(customersApi.fetchCustomers, customersAction.setCustomers);

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) => dispatch(actions.setOrderToCreateOrEdit(null));

const onCancelOrderModal = () => (dispatch: Dispatch<any>) => {
  dispatch(actions.setOrderToCreateOrEdit(null));
  dispatch(actions.setFare(null));
};

const fetchFareWithCb = (idCustomerFare: number, cb: Function) => fetchOperationWithLoading(() => faresApi.fetchFares(idCustomerFare), null, cb);
const fetchFare = (idCustomerFare: number) => fetchOperationWithLoading(() => faresApi.fetchFares(idCustomerFare), actions.setFare);

const createFare = (fare: IFare, cb: Function) =>
  generalCreateOrEditOperation(
    () => faresApi.createFare(fare),
    (fare: any, dispatch: any) => {
      dispatch(actions.setFare(fare));
      cb(fare);
    },
  );

const editFare = (fare: IFare, cb: Function) =>
  generalCreateOrEditOperation(
    () => faresApi.editFare(fare),
    (fare: any, dispatch: any) => {
      dispatch(actions.setFare(fare));
      cb(fare);
    },
  );

const createOrder = (order: IOrder) =>
  generalCreateOrEditOperation(
    () => apiOrders.createOrder(order),
    (res: any, dispatch: any) => dispatch(fetchOrders()),
  );

const editOrder = (order: IOrder, initialType: string) =>
  generalCreateOrEditOperation(
    () => apiOrders.editOrder(order, initialType),
    (res: any, dispatch: any) => dispatch(fetchOrders()),
  );

export default {
  fetchOrder,
  fetchOrders,
  fetchProducts,
  fetchFares,
  fetchCustomers,
  removeElementToCreateOrEdit,
  onCancelOrderModal,
  fetchFareWithCb,
  createFare,
  fetchFare,
  createOrder,
  editFare,
  editOrder,
};
