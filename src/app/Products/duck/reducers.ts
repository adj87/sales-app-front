import { SET_PRODUCTS, ProductsState, SET_PRODUCT_TO_CREATE_OR_EDIT } from './types';
import { AnyAction } from 'redux';

const initialState = {
  data: [],
  elementToCreateOrEdit: null,
};

const productsReducer = (state = initialState, { type, payload }: AnyAction): ProductsState => {
  switch (type) {
    case SET_PRODUCTS:
      return { ...state, data: payload };
    case SET_PRODUCT_TO_CREATE_OR_EDIT:
      return { ...state, elementToCreateOrEdit: payload };
    default:
      return state;
  }
};

export default productsReducer;
