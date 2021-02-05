import { IAlert } from './IAlert';

const SECTION_ALERTS = 'ALERTS';
export const SET_ALERT = SECTION_ALERTS + 'SET_ALERT';
export const DELETE_ALERT = SECTION_ALERTS + 'DELETE_ALERT';

export interface SetAlertAction {
  type: typeof SET_ALERT;
  payload: IAlert;
}

export interface DeleteAlertAction {
  type: typeof DELETE_ALERT;
  payload: string;
}

export type AlertsActions = SetAlertAction | DeleteAlertAction;

export type AlertsState = [IAlert];
