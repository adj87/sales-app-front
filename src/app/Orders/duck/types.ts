import { Order } from '../mainInterfaces';

const SECTION_ORDERS = 'ORDERS_';
export const SET_ORDERS = SECTION_ORDERS + 'SET_ORDERS';
export const SET_ORDER_TO_CREATE_OR_EDIT = SECTION_ORDERS + 'SET_ORDER_TO_CREATE_OR_EDIT';

export interface SetOrdersAction {
  type: typeof SET_ORDERS;
  payload: Order[];
}

export interface SetElementToCreateOrEditAction {
  type: typeof SET_ORDER_TO_CREATE_OR_EDIT;
  payload: Order | null;
}

export type OrdersActions = SetOrdersAction | SetElementToCreateOrEditAction;

export interface OrdersState {
  data: Order[];
  elementToCreateOrEdit: Order | null;
}
