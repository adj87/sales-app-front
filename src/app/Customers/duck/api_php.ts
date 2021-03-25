import axios from 'axios';
import { getPhpBackHostUrl } from '../../../utils';

const BACK_HOST = getPhpBackHostUrl();
const API_CUSTOMERS = `${BACK_HOST}/cliente`;

const fetchCustomers = (orderId?: string) => {
  const url = orderId ? `${API_CUSTOMERS}/?id=${orderId}` : API_CUSTOMERS;
  return axios.get(url);
};

export default {
  fetchCustomers,
};
