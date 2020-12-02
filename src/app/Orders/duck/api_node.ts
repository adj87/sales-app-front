import axios from 'axios/index';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_ORDERS = `${BACK_HOST}/orders`;

const fetchOrders = (type?: string, orderId?: Number) => {
  const url = orderId ? `${API_ORDERS}/${orderId}/type/${type}` : API_ORDERS;
  return axios.get(url);
};

export default {
  fetchOrders,
};
