import actions from '../duck/actions';
import { Dispatch } from 'react';
import { DeleteAlertAction } from './types';

const deleteAlert = (id: string) => (dispatch: Dispatch<DeleteAlertAction>) => {
  return dispatch(actions.deleteAlert(id));
};

export default { deleteAlert };
