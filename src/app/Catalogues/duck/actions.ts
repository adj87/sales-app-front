import { IFare } from '../../Fares/duck/types/Fare';
import { SetFare, SET_FARE, SetProducts } from './types';
import { IProduct } from '../../Products/duck/types/Product';
import { SET_PRODUCTS } from '../../Products/duck/types';

export const setFare = (fare: IFare): SetFare => ({
  payload: fare,
  type: SET_FARE,
});

export const setProducts = (products: IProduct[]): SetProducts => ({
  payload: products,
  type: SET_PRODUCTS,
});
