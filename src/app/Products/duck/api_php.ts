import axios from 'axios';
import { getPhpBackHostUrl } from '../../../utils';

const BACK_HOST = getPhpBackHostUrl();
const API_PRODUCTS = `${BACK_HOST}/articulo`;

const fetchProducts = (productId?: Number) => {
  const url = productId ? `${API_PRODUCTS}/${productId}` : API_PRODUCTS;
  return axios.get(url);
};

const fetchProductCost = (productId: string) => {
  const url = `${API_PRODUCTS}/costo/?codigo=${productId}`;
  return axios.get(url);
};

export default {
  fetchProducts,
  fetchProductCost,
};
