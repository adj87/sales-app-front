import { IFare } from '../../Fares/duck/types/Fare';
import { SetProducts, SET_PRODUCTS, SetFare, SET_FARE } from './types';
import { IProduct } from '../../Products/duck/types/Product';

const setFare = (fare: IFare): SetFare => ({
  payload: fare,
  type: SET_FARE,
});

const setProducts = (products: IProduct[]): SetProducts => ({
  payload: products,
  type: SET_PRODUCTS,
});

export default {
  setFare,
  setProducts,
};
