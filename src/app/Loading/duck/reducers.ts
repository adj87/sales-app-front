import { SET_LOADING } from './types';
import { AnyAction } from 'redux';

const initialState = false;

const ordersReducer = (state = initialState, { type, payload }: AnyAction): boolean => {
  switch (type) {
    case SET_LOADING:
      return payload;
    default:
      return state;
  }
};

export default ordersReducer;
