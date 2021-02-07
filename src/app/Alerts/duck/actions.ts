import { IAlert } from './types/IAlert';
import { SetAlertAction, SET_ALERT, DeleteAlertAction, DELETE_ALERT } from './types';

const setAlert = (alert: IAlert): SetAlertAction => ({
  type: SET_ALERT,
  payload: alert,
});

const deleteAlert = (id: string): DeleteAlertAction => ({
  type: DELETE_ALERT,
  payload: id,
});

export default { setAlert, deleteAlert };
