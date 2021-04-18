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
  const url = `${API_CUSTOMERS}/getRutas`;
  return axios.get(url);
};

const fetchPaymentsMethods = () => {
  const url = `${API_CUSTOMERS}/getMetodosPago`;
  return axios.get(url);
};

const createCustomer = (c: ICustomer) => {
  const url = `${API_CUSTOMERS}/insertaCliente`;
  let data = new FormData();
  data.append('cliente', JSON.stringify(c));
  return axios.post(url, data);
};

const editCustomer = (c: ICustomer) => {
  const url = `${API_CUSTOMERS}/editaCliente?codigo=${c.id}`;
  let data = new FormData();
  data.append('cliente', JSON.stringify(c));
  return axios.post(url, data);
};

const deleteCustomer = (id: string) => {
  const url = `${API_CUSTOMERS}/eliminaCliente/?codigo=${id}`;
  return axios.post(url);
};

const fetchChartUnitsByProductMonthAndCustomer = (id: string) => {
  const url = `${API_CUSTOMERS}/getUnidadesPorProductoMesCliente/?codigo=${id}`;
  return axios.get(url);
};

export default {
  fetchCustomers,
  fetchRoutes,
  fetchPaymentsMethods,
  createCustomer,
  editCustomer,
  deleteCustomer,
  fetchChartUnitsByProductMonthAndCustomer,
};
