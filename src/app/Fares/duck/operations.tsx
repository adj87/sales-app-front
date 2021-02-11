import { Dispatch } from 'react';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetElementToCreateOrEditAction } from './types';
import { operations as loadingOperations } from '../../Loading/duck';

import { actions as customersAction, api as customersApi } from '../../Customers/duck';
import { actions as productsAction, api as productsApi } from '../../Products/duck';
import { fareLinesToFares } from '../constants';
import { IFare } from './types/Fare';

const { fetchOperationWithLoading, generalCreateOrEditOperation } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) => dispatch(actions.setFareToCreateOrEdit(null));

const fetchFaresLinesCustomersAndProducts = () => {
  return fetchOperationWithLoading(
    () => Promise.all([api.fetchFareLines(), customersApi.fetchCustomers(), productsApi.fetchProducts()]),
    [actions.setFareLines, customersAction.setCustomers, productsAction.setProducts],
    (res: any, dispatch: any) => {
      const fares = fareLinesToFares(res[0].data);
      dispatch(actions.setFares(fares));
    },
  );
};

const fetchFareToEdit = (customerId: number) => fetchOperationWithLoading(() => api.fetchFares(customerId), actions.setFareToCreateOrEdit);
const setFareToCreateOrEdit = actions.setFareToCreateOrEdit;
const setFareToInheritFrom = actions.setFareToInheritFrom;
const fetchFareWithCb = (idCustomerFare: number, cb: Function) => fetchOperationWithLoading(() => api.fetchFares(idCustomerFare), null, cb);

const createFare = (fare: IFare, cb: Function) =>
  generalCreateOrEditOperation(
    () => api.createFare(fare),
    (fare: any, dispatch: any) => {
      dispatch(fetchFaresLinesCustomersAndProducts());
    },
  );

const editFare = (fare: IFare, cb: Function) =>
  generalCreateOrEditOperation(
    () => api.editFare(fare),
    (fare: any, dispatch: any) => {
      dispatch(fetchFaresLinesCustomersAndProducts());
    },
  );

export default {
  removeElementToCreateOrEdit,
  fetchFaresLinesCustomersAndProducts,
  setFareToCreateOrEdit,
  fetchFareWithCb,
  setFareToInheritFrom,
  fetchFareToEdit,
  createFare,
  editFare,
};
