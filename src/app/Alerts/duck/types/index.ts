import { IAlert } from './IAlert';

const SECTION_ALERTS = 'ALERTS';
export const ADD_ALERT = SECTION_ALERTS + 'ADD_ALERT';
export const DELETE_ALERT = SECTION_ALERTS + 'DELETE_ALERT';

export interface AddAlertAction {
  type: typeof ADD_ALERT;
  payload: IAlert;
}

export interface DeleteAlertAction {
  type: typeof DELETE_ALERT;
  payload: string;
}

export type AlertsActions = AddAlertAction | DeleteAlertAction;

export type AlertsState = Array<IAlert>;
