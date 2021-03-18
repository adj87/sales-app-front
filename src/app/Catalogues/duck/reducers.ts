import { AnyAction } from 'redux';
import { CataloguesState, SET_FARE, SET_PRODUCTS } from './types';

const initialState = {
  products: [],
  fare: null,
};

const cataloguesReducer = (state = initialState, { type, payload }: AnyAction): CataloguesState => {
  switch (type) {
    case SET_FARE:
      return { ...state, fare: payload };
    case SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export default cataloguesReducer;
