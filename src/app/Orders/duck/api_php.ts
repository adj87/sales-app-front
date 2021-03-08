import axios from 'axios';
import { getPhpBackHostUrl } from '../../../utils';
import { IOrder } from './types/Order';

const API_END_POINT = getPhpBackHostUrl();
const API_ORDERS = `${API_END_POINT}/pedido`;

const fetchOrders = (type?: string, orderId?: Number) => {
  const url = orderId ? `${API_ORDERS}/?id=${orderId}&serie=${type}` : API_ORDERS;
  return axios.get(url);
};

const createOrder = (order: IOrder) => {
  const url = `${API_ORDERS}/insertaPedido`;
  let data = new FormData();
  data.append('pedido', JSON.stringify(order));
  return axios.post(url, data);
};

const editOrder = (order: IOrder) => {
  const url = `${API_ORDERS}/${order.id}`;
  return axios.put(url, order);
};

const deleteOrder = (order: IOrder) => {
  const url = `${API_ORDERS}/${order.id}/type/${order.type}`;
  return axios.delete(url);
};

export default {
  fetchOrders,
  createOrder,
  editOrder,
  deleteOrder,
};
