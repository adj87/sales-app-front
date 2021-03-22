import axios from 'axios';
import { getPhpBackHostUrl } from '../../../utils';
import { IProduct } from './types/Product';

const BACK_HOST = getPhpBackHostUrl();
const API_PRODUCTS = `${BACK_HOST}/articulo`;

const fetchProducts = (productId?: string) => {
  const url = productId ? `${API_PRODUCTS}/?codigo=${productId}` : API_PRODUCTS;
  return axios.get(url);
};

const fetchProductCost = (productId: string) => {
  const url = `${API_PRODUCTS}/costo/?codigo=${productId}`;
  return axios.get(url);
};

const editProduct = (id: string, product: IProduct) => {
  const url = `${API_PRODUCTS}/editaArticulo/?codigo=${product.id}`;
  let data = new FormData();
  data.append('articulo', JSON.stringify(product));
  return axios.post(url, data);
};

export default {
  fetchProducts,
  fetchProductCost,
  editProduct,
};
