import api_php from './api_php';
import api_node from './api_node';
import actions from './actions';

import { Dispatch } from 'react';
import { SetOrdersAction, SetElementToCreateOrEditAction } from './types';
import { AxiosResponse } from 'axios';
import { IOrder } from './types/Order';

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchOrders = () => (dispatch: Dispatch<SetOrdersAction>) => {
  api.fetchOrders().then((response: AxiosResponse<IOrder[]>) => {
    return dispatch(actions.setOrders(response.data));
  });
};

const fetchOrder = (type: string, orderId: Number) => (
  dispatch: Dispatch<SetElementToCreateOrEditAction>,
) => {
  api.fetchOrders(type, orderId).then((response: AxiosResponse<IOrder>) => {
    return dispatch(actions.setOrderToCreateOrEdit(response.data));
  });
};

const removeElementToCreateOrEdit = (dispatch: Dispatch<SetElementToCreateOrEditAction>) =>
  dispatch(actions.setOrderToCreateOrEdit(null));

export default { fetchOrders, fetchOrder, removeElementToCreateOrEdit };
