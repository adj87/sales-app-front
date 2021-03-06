import axios from 'axios';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_CUSTOMERS = `${BACK_HOST}clientes`;

const fetchCustomers = (orderId?: Number) => {
  const url = orderId ? `${API_CUSTOMERS}/?id=${orderId}` : API_CUSTOMERS;
  return axios.get(url);
};

export default {
  fetchCustomers,
};
