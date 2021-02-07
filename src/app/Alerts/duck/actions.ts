import { IAlert } from './types/IAlert';
import { AddAlertAction, ADD_ALERT, DeleteAlertAction, DELETE_ALERT } from './types';

const addAlert = (alert: IAlert): AddAlertAction => ({
  type: ADD_ALERT,
  payload: alert,
});

const deleteAlert = (id: string): DeleteAlertAction => ({
  type: DELETE_ALERT,
  payload: id,
});

export default { addAlert, deleteAlert };
