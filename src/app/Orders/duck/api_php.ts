import axios from 'axios';
import { IOrder } from './types/Order';

const API_END_POINT = process.env.REACT_APP_API_END_POINT;
const API_ORDERS = `${API_END_POINT}clientes`;

const fetchOrders = (type?: string, orderId?: Number) => {
  const url = orderId ? `${API_ORDERS}/?id=${orderId}` : API_ORDERS;
  return axios.get(url);
};

const createOrder = (order: IOrder) => {
  const url = API_ORDERS;
  return axios.post(url, order);
};

export default {
  fetchOrders,
  createOrder,
};
