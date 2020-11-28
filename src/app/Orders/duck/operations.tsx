import api_php from './api_php';
import actions from './actions';

import { Dispatch } from 'react';
import { SetOrdersAction } from './types';
import { AxiosResponse } from 'axios';
import { Order } from '../mainInterfaces';
import api_node from './api_node';

const api = api_node;

const fetchOrders = (orderId?: Number) => (dispatch: Dispatch<SetOrdersAction>) => {
  api.fetchOrders(orderId).then((response: AxiosResponse<Order[]>) => {
    return dispatch(actions.setOrders(response.data));
  });
};

export default { fetchOrders };
