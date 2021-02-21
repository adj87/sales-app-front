import { Dispatch } from 'react';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetElementToCreateOrEditAction } from './types';
import { operations as loadingOperations } from '../../Loading/duck';

import { actions as customersAction, api as customersApi } from '../../Customers/duck';
import { actions as productsAction, api as productsApi } from '../../Products/duck';
import { fareLinesToFares } from '../constants';
import { IFare, IFareLine } from './types/Fare';

const { fetchOperationWithLoading, generalCreateOrEditOperation } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) => dispatch(actions.setFareToCreateOrEdit(null));

const fetchFareAndFareLines = () =>
  fetchOperationWithLoading(api.fetchFareLines, actions.setFareLines, (res: any, dispatch: any) => {
    const fares = fareLinesToFares(res.data);
    dispatch(actions.setFares(fares));
  });
const fetchCustomers = () => fetchOperationWithLoading(customersApi.fetchCustomers, customersAction.setCustomers);
const fetchProducts = () => fetchOperationWithLoading(productsApi.fetchProducts, productsAction.setProducts);

const fetchFareToEdit = (customerId: number) => fetchOperationWithLoading(() => api.fetchFares(customerId), actions.setFareToCreateOrEdit);
const setFareToCreateOrEdit = actions.setFareToCreateOrEdit;
const setFareToInheritFrom = actions.setFareToInheritFrom;
const fetchFareWithCb = (idCustomerFare: number, cb: Function) => fetchOperationWithLoading(() => api.fetchFares(idCustomerFare), null, cb);

const createFare = (fare: IFare, cb: Function) =>
  generalCreateOrEditOperation(
    () => api.createFare(fare),
    (fare: any, dispatch: any) => {
      dispatch(fetchFareAndFareLines());
    },
  );

const editFare = (fare: IFare, cb: Function) =>
  generalCreateOrEditOperation(
    () => api.editFare(fare),
    (fare: any, dispatch: any) => {
      dispatch(fetchFareAndFareLines());
    },
  );

const deleteFare = (customerId: string) =>
  generalCreateOrEditOperation(
    // @ts-ignore
    () => api.deleteFare(customerId),
    (res: any, dispatch: any) => dispatch(fetchFareAndFareLines()),
  );

export default {
  removeElementToCreateOrEdit,
  fetchFareAndFareLines,
  fetchCustomers,
  fetchProducts,
  setFareToCreateOrEdit,
  fetchFareWithCb,
  setFareToInheritFrom,
  fetchFareToEdit,
  createFare,
  editFare,
  deleteFare,
};
