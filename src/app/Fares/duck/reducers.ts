import {
  SET_FARES,
  FaresState,
  SET_FARE_TO_CREATE_OR_EDIT,
  SET_FARE_TO_INHERIT_FROM,
  SET_FARE_LINES,
} from './types';
import { AnyAction } from 'redux';

const initialState = {
  data: { fares: [], fareLines: [] },
  elementToCreateOrEdit: null,
  fareToInheritFrom: null,
};

const faresReducer = (state = initialState, { type, payload }: AnyAction): FaresState => {
  switch (type) {
    case SET_FARES:
      return { ...state, data: { fareLines: [...state.data.fareLines], fares: payload } };
    case SET_FARE_LINES:
      return { ...state, data: { fares: [...state.data.fares], fareLines: payload } };
    case SET_FARE_TO_CREATE_OR_EDIT:
      return { ...state, elementToCreateOrEdit: payload };
    case SET_FARE_TO_INHERIT_FROM:
      return { ...state, fareToInheritFrom: payload };
    default:
      return state;
  }
};

export default faresReducer;
