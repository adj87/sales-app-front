import { Dispatch } from 'react';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetElementToCreateOrEditAction } from './types';
import { operations as loadingOperations } from '../../Loading/duck';

import { actions as customersAction, api as customersApi } from '../../Customers/duck';
import { actions as productsAction, api as productsApi } from '../../Products/duck';
import { fareLinesToFares } from '../constants';

const { fetchOperationWithLoading } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setFareToCreateOrEdit(null));

const fetchFareLines = () => fetchOperationWithLoading(api.fetchFareLines, actions.setFareLines);

const fetchFaresLinesFareCustomersAndProducts = (idCustomerFare: number) =>
  fetchOperationWithLoading(
    () =>
      Promise.all([
        api.fetchFareLines(),
        api.fetchFares(idCustomerFare),
        customersApi.fetchCustomers(),
        productsApi.fetchProducts(),
      ]),
    [
      actions.setFareLines,
      actions.setFareToCreateOrEdit,
      customersAction.setCustomers,
      productsAction.setProducts,
    ],
    (res: any, dispatch: any) => {
      const fares = fareLinesToFares(res[0].data);
      dispatch(actions.setFares(fares));
    },
  );

const fetchFareLinesCustomersAndProducts = () =>
  fetchOperationWithLoading(
    () =>
      Promise.all([
        api.fetchFareLines(),
        customersApi.fetchCustomers(),
        productsApi.fetchProducts(),
      ]),
    [actions.setFareLines, customersAction.setCustomers, productsAction.setProducts],
    (res: any, dispatch: any) => {
      const fares = fareLinesToFares(res[0].data);
      dispatch(actions.setFares(fares));
    },
  );

const setFareToCreateOrEdit = actions.setFareToCreateOrEdit;
const setFareToInheritFrom = actions.setFareToInheritFrom;
const fetchFareWithCb = (idCustomerFare: number, cb: Function) =>
  fetchOperationWithLoading(() => api.fetchFares(idCustomerFare), null, cb);

export default {
  removeElementToCreateOrEdit,
  fetchFareLines,
  fetchFaresLinesFareCustomersAndProducts,
  fetchFareLinesCustomersAndProducts,
  setFareToCreateOrEdit,
  fetchFareWithCb,
  setFareToInheritFrom,
};
