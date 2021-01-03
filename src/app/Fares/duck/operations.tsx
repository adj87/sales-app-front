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

const fetchFares = () => fetchOperationWithLoading(api.fetchFares, actions.setFares);

const fetchFareCustomersAndProducts = (idCustomerFare: number) =>
  fetchOperationWithLoading(
    () =>
      Promise.all([
        api.fetchFares(idCustomerFare, true),
        customersApi.fetchCustomers(),
        productsApi.fetchProducts(),
      ]),
    [actions.setFareToCreateOrEdit, customersAction.setCustomers, productsAction.setProducts],
  );

const setFareToCreateOrEdit = actions.setFareToCreateOrEdit;

export default {
  removeElementToCreateOrEdit,
  fetchFares,
  fetchFareCustomersAndProducts,
  setFareToCreateOrEdit,
};
