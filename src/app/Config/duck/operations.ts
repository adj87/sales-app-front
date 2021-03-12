import { Dispatch } from 'redux';
import actions from './actions';

const setYear = (year: number) => (dispatch: Dispatch) => {
  return dispatch(actions.setYear(year));
};

export default { setYear };
