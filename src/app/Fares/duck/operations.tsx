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

const fetchFaresLinesFareCustomersAndProducts = (
  withFlines: boolean,
  idCustomerFare: number,
  withCustomersAndProducts: boolean,
) => {
  const setOfRequests: any = {
    fLines: () => api.fetchFareLines(),
    fare: () => api.fetchFares(idCustomerFare),
    customers: () => customersApi.fetchCustomers(),
    products: () => productsApi.fetchProducts(),
  };
  const setOfActions: any = {
    fLines: actions.setFareLines,
    fare: actions.setFareToCreateOrEdit,
    customers: customersAction.setCustomers,
    products: productsAction.setProducts,
  };
  if (!idCustomerFare) {
    delete setOfRequests.fare;
    delete setOfActions.fare;
  }
  if (!withFlines) {
    delete setOfRequests.fLines;
    delete setOfActions.fLines;
  }
  if (!withCustomersAndProducts) {
    delete setOfRequests.customers;
    delete setOfRequests.products;
    delete setOfActions.customers;
    delete setOfActions.products;
  }
  return fetchOperationWithLoading(
    () => Promise.all(Object.values(setOfRequests).map((req: any) => req())),
    Object.values(setOfActions),
    (res: any, dispatch: any) => {
      if (withFlines) {
        const fares = fareLinesToFares(res[0].data);
        dispatch(actions.setFares(fares));
      }
    },
  );
};

const setFareToCreateOrEdit = actions.setFareToCreateOrEdit;
const setFareToInheritFrom = actions.setFareToInheritFrom;
const fetchFareWithCb = (idCustomerFare: number, cb: Function) =>
  fetchOperationWithLoading(() => api.fetchFares(idCustomerFare), null, cb);

export default {
  removeElementToCreateOrEdit,
  fetchFareLines,
  fetchFaresLinesFareCustomersAndProducts,
  setFareToCreateOrEdit,
  fetchFareWithCb,
  setFareToInheritFrom,
};
