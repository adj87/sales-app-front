import { SET_YEAR, SetYearAction } from './types';

const setYear = (year: number): SetYearAction => ({
  type: SET_YEAR,
  payload: year,
});

export default { setYear };
