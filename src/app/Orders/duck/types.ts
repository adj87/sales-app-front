import { Order } from '../mainInterfaces';

const SECTION_ORDERS = 'ORDERS_';
export const SET_ORDERS = SECTION_ORDERS + 'SET_ORDERS';

export interface SetOrdersAction {
  type: typeof SET_ORDERS;
  payload: Order[];
}

export interface OrdersState {
  orders: Order[];
}

export type OrdersActionsTypes = SetOrdersAction;
