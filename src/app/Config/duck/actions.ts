import { SET_YEAR, SetYearAction } from './types';

export const setYear = (year: number): SetYearAction => ({
  type: SET_YEAR,
  payload: year,
});
