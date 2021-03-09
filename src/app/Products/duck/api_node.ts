import axios from 'axios';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_PRODUCTS = `${BACK_HOST}/products`;

const fetchProducts = (productId?: Number) => {
  const url = productId ? `${API_PRODUCTS}/${productId}` : API_PRODUCTS;
  return axios.get(url);
};

const fetchProductCost = (productId: string) => {};

export default {
  fetchProducts,
  fetchProductCost,
};
