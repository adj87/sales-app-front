import axios from 'axios/index';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_CUSTOMERS = `${BACK_HOST}/customers`;

const fetchCustomers = (customerId?: string) => {
  const url = customerId ? `${API_CUSTOMERS}/${customerId}` : API_CUSTOMERS;
  return axios.get(url);
};

export default {
  fetchCustomers,
};
