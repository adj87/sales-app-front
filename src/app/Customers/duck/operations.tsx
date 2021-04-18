import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { randomColor } from 'randomcolor';

import { Dispatch } from 'react';
import { SetChartUnitsByMonthProductAndCustomer, SetCustomerToCreateOrEditAction } from './types';

import { operations as loadingOperations } from '../../Loading/duck';
import { defaultValues } from '../constants';
import { ICustomer, IProductAndItsColor } from './types/ICustomer';
const { fetchOperationWithLoading, generalCreateOrEditOperation } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchCustomers = () => fetchOperationWithLoading(() => api.fetchCustomers(), actions.setCustomers);
const fetchPaymentMethods = () => fetchOperationWithLoading(() => api.fetchPaymentsMethods(), actions.setPaymentMethods);
const fetchRoutes = () => fetchOperationWithLoading(() => api.fetchRoutes(), actions.setRoutes);
const fetchCustomer = (customerId?: string) => {
  if (customerId) {
    return fetchOperationWithLoading(() => api.fetchCustomers(customerId), actions.setCustomerToCreateOrEdit);
  } else {
    return (dispatch: Dispatch<any>, getState: any) => {
      const agentId = getState().config.agent.id;

      dispatch(actions.setCustomerToCreateOrEdit(defaultValues(agentId)));
    };
  }
};

const createCustomer = (c: ICustomer, cb: Function) =>
  generalCreateOrEditOperation(
    () => api.createCustomer(c),
    (res: any, dispatch: any) => {
      dispatch(fetchCustomers());
      cb(); // this cb is for closing the modal
    },
  );

const editCustomer = (c: ICustomer, cb: Function) =>
  generalCreateOrEditOperation(
    () => api.editCustomer(c),
    (res: any, dispatch: any) => {
      dispatch(fetchCustomers());
      cb(); // this cb is for closing the modal
    },
  );

const deleteCustomer = (c: ICustomer) =>
  generalCreateOrEditOperation(
    // @ts-ignore
    () => api.deleteCustomer(c.id),
    (res: any, dispatch: any) => dispatch(fetchCustomers()),
  );

const removeElementToCreateOrEdit = () => (dispatch: Dispatch<SetCustomerToCreateOrEditAction>) => dispatch(actions.setCustomerToCreateOrEdit(null));
const resetCharts = () => (dispatch: Dispatch<SetChartUnitsByMonthProductAndCustomer>) =>
  // @ts-ignore
  dispatch(actions.setChartUnitsByMonthProductAndCustomer({ data: [], last_data: [], products: [] }));
const fetchChartUnitsByProductMonthAndCustomer = (id: string) =>
  fetchOperationWithLoading(
    () => api.fetchChartUnitsByProductMonthAndCustomer(id),
    null,
    ({ data }: any, dis: any) => {
      const { products, ...res } = data;
      const arrayColors = randomColor({ luminosity: 'dark', count: products.length });
      const newProducts: IProductAndItsColor[] = products.map((name: string, i: number) => ({ name, color: arrayColors[i] }));
      dis(actions.setChartUnitsByMonthProductAndCustomer({ ...res, products: newProducts }));
    },
  );

export default {
  fetchCustomers,
  fetchCustomer,
  removeElementToCreateOrEdit,
  editCustomer,
  deleteCustomer,
  createCustomer,
  fetchPaymentMethods,
  fetchRoutes,
  fetchChartUnitsByProductMonthAndCustomer,
  resetCharts,
};
