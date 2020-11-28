import axios from 'axios/index';

const API_END_POINT = process.env.REACT_APP_API_END_POINT;
const API_ORDERS = `http://localhost:3001/orders`;

const fetchOrders = (orderId?: Number) => {
  const url = orderId ? `${API_ORDERS}/${orderId}` : API_ORDERS;
  return axios.get(url);
};

export default {
  fetchOrders,
};
