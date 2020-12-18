import { Dispatch } from 'react';
import { AxiosResponse } from 'axios';

import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';
import { SetFaresAction, SetElementToCreateOrEditAction } from './types';
import { operations as customersOperations } from '../../Customers/duck';
import { operations as productsOperations } from '../../Products/duck';

import { IFare } from './types/Fare';

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setOrderToCreateOrEdit(null));

const fetchCustomers = customersOperations.fetchCustomers;
const fetchProducts = productsOperations.fetchProducts;
const setOrderToCreateOrEdit = actions.setOrderToCreateOrEdit;

export default {
  removeElementToCreateOrEdit,
  fetchCustomers,
  fetchProducts,
  setOrderToCreateOrEdit,
};
