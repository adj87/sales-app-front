import { IFare } from './Fare';

const SECTION_FARES = 'FARES_';
export const SET_FARES = SECTION_FARES + 'SET_FARES';
export const SET_FARE_TO_CREATE_OR_EDIT = SECTION_FARES + 'SET_FARE_TO_CREATE_OR_EDIT';
export const SET_FARE_TO_INHERIT_FROM = SECTION_FARES + 'SET_FARE_TO_INHERIT_FROM';

export interface SetFaresAction {
  type: typeof SET_FARES;
  payload: IFare[];
}

export interface SetElementToCreateOrEditAction {
  type: typeof SET_FARE_TO_CREATE_OR_EDIT;
  payload: IFare | null;
}

export interface SetFareToInheritFromAction {
  type: typeof SET_FARE_TO_INHERIT_FROM;
  payload: IFare | null;
}

export type FaresActions =
  | SetFaresAction
  | SetFareToInheritFromAction
  | SetElementToCreateOrEditAction;

export interface FaresState {
  data: IFare[];
  elementToCreateOrEdit: IFare | null;
  fareToInheritFrom: IFare | null;
}
