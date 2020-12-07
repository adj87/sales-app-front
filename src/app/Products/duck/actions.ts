import {
  SET_PRODUCTS,
  SetElementToCreateOrEditAction,
  SET_PRODUCT_TO_CREATE_OR_EDIT,
  SetProductsAction,
} from './types';
import { IProduct } from './types/Product';

const setProducts = (products: IProduct[]): SetProductsAction => ({
  type: SET_PRODUCTS,
  payload: products,
});

const setProductToCreateOrEdit = (product: IProduct | null): SetElementToCreateOrEditAction => ({
  type: SET_PRODUCT_TO_CREATE_OR_EDIT,
  payload: product,
});

export default {
  setProducts,
  setProductToCreateOrEdit,
};
