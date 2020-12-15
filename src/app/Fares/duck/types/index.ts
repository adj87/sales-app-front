import { IFare } from './Fare';

const SECTION_FARES = 'FARES_';
export const SET_FARES = SECTION_FARES + 'SET_FARES';
export const SET_FARE_TO_CREATE_OR_EDIT = SECTION_FARES + 'SET_FARE_TO_CREATE_OR_EDIT';

export interface SetFaresAction {
  type: typeof SET_FARES;
  payload: IFare[];
}

export interface SetElementToCreateOrEditAction {
  type: typeof SET_FARE_TO_CREATE_OR_EDIT;
  payload: IFare | null;
}

export type FaresActions = SetFaresAction | SetElementToCreateOrEditAction;

export interface FaresState {
  data: IFare[];
  elementToCreateOrEdit: IFare | null;
}
