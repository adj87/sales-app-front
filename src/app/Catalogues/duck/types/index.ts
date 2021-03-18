import { IFare } from '../../../Fares/duck/types/Fare';
import { IProduct } from '../../../Products/duck/types/Product';

const SECTION_CATALOGUES = 'CATALOGUES';
export const SET_FARE = SECTION_CATALOGUES + 'SET_FARE';
export const SET_PRODUCTS = SECTION_CATALOGUES + 'SET_PRODUCTS';

export interface SetFare {
  type: typeof SET_FARE;
  payload: IFare;
}

export interface SetProducts {
  type: typeof SET_PRODUCTS;
  payload: IProduct[];
}
