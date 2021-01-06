import {
  SET_FARES,
  SetElementToCreateOrEditAction,
  SET_FARE_TO_CREATE_OR_EDIT,
  SetFaresAction,
  SET_FARE_TO_INHERIT_FROM,
  SetFareToInheritFromAction,
  SET_FARE_LINES,
  SetFareLinesAction,
} from './types';
import { IFare, IFareLine } from './types/Fare';

const setFares = (fares: IFare[]): SetFaresAction => ({
  type: SET_FARES,
  payload: fares,
});

const setFareLines = (fares: IFareLine[]): SetFareLinesAction => ({
  type: SET_FARE_LINES,
  payload: fares,
});

const setFareToCreateOrEdit = (fare: IFare | null): SetElementToCreateOrEditAction => ({
  type: SET_FARE_TO_CREATE_OR_EDIT,
  payload: fare,
});

const setFareToInheritFrom = (fare: IFare | null): SetFareToInheritFromAction => ({
  type: SET_FARE_TO_INHERIT_FROM,
  payload: fare,
});

export default {
  setFares,
  setFareLines,
  setFareToCreateOrEdit,
  setFareToInheritFrom,
};
