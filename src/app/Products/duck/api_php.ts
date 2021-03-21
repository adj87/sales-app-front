import axios from 'axios';
import { getPhpBackHostUrl } from '../../../utils';
import { IProduct } from './types/Product';

const BACK_HOST = getPhpBackHostUrl();
const API_PRODUCTS = `${BACK_HOST}/articulo`;

const fetchProducts = (productId?: string) => {
  const url = productId ? `${API_PRODUCTS}/${productId}` : API_PRODUCTS;
  return axios.get(url);
};

const fetchProductCost = (productId: string) => {
  const url = `${API_PRODUCTS}/costo/?codigo=${productId}`;
  return axios.get(url);
};

const editProduct = (id: string, product: IProduct) => {
  const url = `${API_PRODUCTS}/${product.id}`;
  return axios.put(url, product);
};

export default {
  fetchProducts,
  fetchProductCost,
  editProduct,
};
