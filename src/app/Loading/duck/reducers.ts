import { REMOVE_PENDING_REQUEST, ADD_PENDING_REQUEST } from './types';
import { AnyAction } from 'redux';

const initialState = 0;

const loadingReducer = (state = initialState, { type }: AnyAction): number => {
  switch (type) {
    case ADD_PENDING_REQUEST:
      return state + 1;
    case REMOVE_PENDING_REQUEST:
      return state - 1;
    default:
      return state;
  }
};

export default loadingReducer;
