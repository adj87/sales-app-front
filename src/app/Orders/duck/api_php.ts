import axios from 'axios';

const API_END_POINT = process.env.REACT_APP_API_END_POINT;
const API_ORDERS = `${API_END_POINT}clientes`;

const fetchOrders = (orderId?: Number) => {
  const url = orderId ? `${API_ORDERS}/?id=${orderId}` : API_ORDERS;
  return axios.get(url);
};

export default {
  fetchOrders,
};
