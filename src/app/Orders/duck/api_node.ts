import axios from 'axios/index';
import { IOrder } from './types/Order';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_ORDERS = `${BACK_HOST}/orders`;

const fetchOrders = (type?: string, orderId?: Number) => {
  const url = orderId ? `${API_ORDERS}/${orderId}/type/${type}` : API_ORDERS;
  return axios.get(url);
};

const createOrder = (order: IOrder) => {
  const url = API_ORDERS;
  return axios.post(url, order);
};

const editOrder = (order: IOrder, initialType: string) => {
  const url = `${API_ORDERS}/${order.id}/type/${initialType}`;
  return axios.put(url, order);
};

export default {
  fetchOrders,
  createOrder,
  editOrder,
};
