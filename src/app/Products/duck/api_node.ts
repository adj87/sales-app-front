import axios from 'axios';
import { IProduct } from './types/Product';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_PRODUCTS = `${BACK_HOST}/products`;

const fetchProducts = (productId?: string) => {
  const url = productId ? `${API_PRODUCTS}/${productId}` : API_PRODUCTS;
  return axios.get(url);
};

const fetchProductCost = (productId: string) => {};

const editProduct = (id: string, product: IProduct) => {
  const url = `${API_PRODUCTS}/${product.id}`;
  return axios.put(url, product);
};

export default {
  fetchProducts,
  fetchProductCost,
  editProduct,
};
