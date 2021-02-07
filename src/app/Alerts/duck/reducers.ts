import { ADD_ALERT, DELETE_ALERT, AlertsState } from './types';
import { IAlert } from './types/IAlert';
import { AnyAction } from 'redux';

const initialState: Array<IAlert> = [];

const alertsReducer = (state = initialState, { type, payload }: AnyAction): AlertsState => {
  switch (type) {
    case ADD_ALERT:
      return [...state, payload];
    case DELETE_ALERT:
      return state.filter((el: IAlert) => el.id !== payload);
    default:
      return state;
  }
};

export default alertsReducer;
