import { SET_FARES, FaresState, SET_FARE_TO_CREATE_OR_EDIT } from './types';
import { AnyAction } from 'redux';

const initialState = {
  data: [],
  elementToCreateOrEdit: null,
};

const ordersReducer = (state = initialState, { type, payload }: AnyAction): FaresState => {
  switch (type) {
    case SET_FARES:
      return { ...state, data: payload };
    case SET_FARE_TO_CREATE_OR_EDIT:
      return { ...state, elementToCreateOrEdit: payload };
    default:
      return state;
  }
};

export default ordersReducer;
