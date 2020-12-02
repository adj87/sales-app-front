import api_php from './api_php';
import actions from './actions';

import { Dispatch } from 'react';
import { SetOrdersAction, SetElementToCreateOrEditAction } from './types';
import { AxiosResponse } from 'axios';
import { Order } from '../mainInterfaces';
import api_node from './api_node';

const api = api_node;

const fetchOrders = () => (dispatch: Dispatch<SetOrdersAction>) => {
  api.fetchOrders().then((response: AxiosResponse<Order[]>) => {
    return dispatch(actions.setOrders(response.data));
  });
};

const fetchOrder = (type: string, orderId: Number) => (
  dispatch: Dispatch<SetElementToCreateOrEditAction>,
) => {
  api.fetchOrders(type, orderId).then((response: AxiosResponse<Order>) => {
    return dispatch(actions.setOrderToCreateOrEdit(response.data));
  });
};

export default { fetchOrders, fetchOrder };
