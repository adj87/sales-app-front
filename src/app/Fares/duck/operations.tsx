import { Dispatch } from 'react';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetElementToCreateOrEditAction } from './types';
import { operations as loadingOperations } from '../../Loading/duck';

import { actions as customersAction, api as customersApi } from '../../Customers/duck';
import { actions as productsAction, api as productsApi } from '../../Products/duck';

const { fetchOperationWithLoading } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setFareToCreateOrEdit(null));

const fetchFareLines = () => fetchOperationWithLoading(api.fetchFareLines, actions.setFares);

const fetchFaresLinesFareCustomersAndProducts = (idCustomerFare: number) =>
  fetchOperationWithLoading(
    () =>
      Promise.all([
        api.fetchFareLines(),
        api.fetchFareLines(idCustomerFare, true),
        customersApi.fetchCustomers(),
        productsApi.fetchProducts(),
      ]),
    [
      actions.setFares,
      actions.setFareToCreateOrEdit,
      customersAction.setCustomers,
      productsAction.setProducts,
    ],
  );

const fetchFaresLinesCustomersAndProducts = () =>
  fetchOperationWithLoading(
    () =>
      Promise.all([
        api.fetchFareLines(),
        customersApi.fetchCustomers(),
        productsApi.fetchProducts(),
      ]),
    [actions.setFares, customersAction.setCustomers, productsAction.setProducts],
  );

const setFareToCreateOrEdit = actions.setFareToCreateOrEdit;
const setFareToInheritFrom = actions.setFareToInheritFrom;
const fetchFareWithCb = (idCustomerFare: number, cb: Function) =>
  fetchOperationWithLoading(() => api.fetchFareLines(idCustomerFare, true), null, cb);

export default {
  removeElementToCreateOrEdit,
  fetchFareLines,
  fetchFaresLinesFareCustomersAndProducts,
  fetchFaresLinesCustomersAndProducts,
  setFareToCreateOrEdit,
  fetchFareWithCb,
  setFareToInheritFrom,
};
