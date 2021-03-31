import axios from 'axios/index';
import { IProduct } from '../../Products/duck/types/Product';
import { ICustomer } from './types/ICustomer';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_CUSTOMERS = `${BACK_HOST}/customers`;

const fetchCustomers = (customerId?: string) => {
  const url = customerId ? `${API_CUSTOMERS}/${customerId}` : API_CUSTOMERS;
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

const deleteCustomer = (id: string) => {
  const url = `${API_CUSTOMERS}/${id}`;
  return axios.delete(url);
};

export default {
  fetchCustomers,
  fetchRoutes,
  fetchPaymentsMethods,
  createCustomer,
  editCustomer,
  deleteCustomer,
};
