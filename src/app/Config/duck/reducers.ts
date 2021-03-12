import dayjs from 'dayjs';
import { AnyAction } from 'redux';
import { ConfigState, SET_YEAR } from './types';

//const initialState = { year: parseInt(dayjs().format('YYYY')) };
const initialState = { year: 2020 };
const configReducer = (state = initialState, { type, payload }: AnyAction): ConfigState => {
  switch (type) {
    case SET_YEAR: {
      return { ...state, year: payload };
    }
    default:
      return state;
  }
};

export default configReducer;
