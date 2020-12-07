import { IProduct } from './Product';

const SECTION_PRODUCTS = 'PRODUCTS_';
export const SET_PRODUCTS = SECTION_PRODUCTS + 'SET_PRODUCTS';
export const SET_PRODUCT_TO_CREATE_OR_EDIT = SECTION_PRODUCTS + 'SET_PRODUCT_TO_CREATE_OR_EDIT';

export interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: IProduct[];
}

export interface SetElementToCreateOrEditAction {
  type: typeof SET_PRODUCT_TO_CREATE_OR_EDIT;
  payload: IProduct | null;
}

export type OrdersActions = SetProductsAction | SetElementToCreateOrEditAction;

export interface ProductsState {
  data: IProduct[];
  elementToCreateOrEdit: IProduct | null;
}
