import {
  SET_FARES,
  SetElementToCreateOrEditAction,
  SET_FARE_TO_CREATE_OR_EDIT,
  SetFaresAction,
} from './types';
import { IFare } from './types/Fare';

const setFares = (fares: IFare[]): SetFaresAction => ({
  type: SET_FARES,
  payload: fares,
});

const setOrderToCreateOrEdit = (fare: IFare | null): SetElementToCreateOrEditAction => ({
  type: SET_FARE_TO_CREATE_OR_EDIT,
  payload: fare,
});

export default {
  setFares,
  setOrderToCreateOrEdit,
};
