import { IOrder } from './Order';
import { IFare } from '../../../Fares/duck/types/Fare';

const SECTION_ORDERS = 'ORDERS_';
export const SET_ORDERS = SECTION_ORDERS + 'SET_ORDERS';
export const SET_FARE = SECTION_ORDERS + 'SET_FARE';
export const SET_ORDER_TO_CREATE_OR_EDIT = SECTION_ORDERS + 'SET_ORDER_TO_CREATE_OR_EDIT';
export const SET_FARE_TO_INHERIT_FROM = SECTION_ORDERS + 'SET_FARE_TO_INHERIT_FROM';

export interface SetOrdersAction {
  type: typeof SET_ORDERS;
  payload: IOrder[];
}

export interface SetFareAction {
  type: typeof SET_FARE;
  payload: IFare | null;
}

export interface SetElementToCreateOrEditAction {
  type: typeof SET_ORDER_TO_CREATE_OR_EDIT;
  payload: IOrder | null;
}

export interface SetFareToInheritFromAction {
  type: typeof SET_FARE_TO_INHERIT_FROM;
  payload: IFare | null;
}

export type OrdersActions = SetOrdersAction | SetElementToCreateOrEditAction;

export interface OrdersState {
  data: IOrder[];
  elementToCreateOrEdit: IOrder | null;
  fare: IFare | null;
  fareToInheritFrom: IFare | null;
}
