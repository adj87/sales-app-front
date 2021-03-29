import axios from 'axios';
import { getPhpBackHostUrl } from '../../../utils';
import { ICustomer } from './types/ICustomer';

const BACK_HOST = getPhpBackHostUrl();
const API_CUSTOMERS = `${BACK_HOST}/cliente`;

const fetchCustomers = (orderId?: string) => {
  const url = orderId ? `${API_CUSTOMERS}/?id=${orderId}` : API_CUSTOMERS;
  return axios.get(url);
};

const fetchRoutes = () => {
  const url = `${API_CUSTOMERS}/routes`;
  return axios.get(url);
};

const fetchPaymentsMethods = () => {
  const url = `${API_CUSTOMERS}/payments-methods`;
  return axios.get(url);
};

const createCustomer = (c: ICustomer) => {
  const url = API_CUSTOMERS;
  return axios.post(url, c);
};

const editCustomer = (c: ICustomer) => {
  const url = `${API_CUSTOMERS}/${c.id}`;
  return axios.put(url, c);
};

export default {
  fetchCustomers,
  fetchRoutes,
  fetchPaymentsMethods,
  createCustomer,
  editCustomer,
};
