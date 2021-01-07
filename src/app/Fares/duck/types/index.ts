import { IFare, IFareLine } from './Fare';

const SECTION_FARES = 'FARES_';
export const SET_FARE_LINES = SECTION_FARES + 'SET_FARE_LINES';
export const SET_FARES = SECTION_FARES + 'SET_FARES';
export const SET_FARE_TO_CREATE_OR_EDIT = SECTION_FARES + 'SET_FARE_TO_CREATE_OR_EDIT';
export const SET_FARE_TO_INHERIT_FROM = SECTION_FARES + 'SET_FARE_TO_INHERIT_FROM';

export interface SetFareLinesAction {
  type: typeof SET_FARE_LINES;
  payload: IFareLine[];
}

export interface SetFaresAction {
  type: typeof SET_FARE_LINES;
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
  | SetFareLinesAction
  | SetFaresAction
  | SetFareToInheritFromAction
  | SetElementToCreateOrEditAction;

export interface FaresState {
  data: { fares: IFare[]; fareLines: IFareLine[] };
  elementToCreateOrEdit: IFare | null;
  fareToInheritFrom: IFare | null;
}
