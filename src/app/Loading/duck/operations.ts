import actions from './actions';
import { AnyAction } from 'redux';
import { actions as alertActions } from '../../Alerts/duck';

import { Dispatch } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { IAlert } from '../../Alerts/duck/types/IAlert';

const fetchOperationWithLoading = (api: Function, setterAction: any, cbOnSuccess?: Function, noLoading?: boolean) => (dispatch: Dispatch<any>) => {
  if (!noLoading) dispatch(actions.setLoading(true));
  api()
    .then((res: AxiosResponse) => {
      if (setterAction) {
        if (setterAction.constructor !== Array) {
          // @ts-ignore
          dispatch(setterAction(res.data));
        } else {
          setterAction.forEach((setter: AnyAction, index: number) => {
            // @ts-ignore
            dispatch(setter(res[index].data));
          });
        }
      }
      if (cbOnSuccess) {
        cbOnSuccess(res, dispatch);
      }
      if (!noLoading) dispatch(actions.setLoading(false));
    })
    .catch((err: AxiosError) => {
      if (!noLoading) dispatch(actions.setLoading(false));
      const messageInfo = err?.response?.data?.info || err.message;
      const alert: IAlert = { type: 'danger', id: Math.random().toString(), message: messageInfo };
      dispatch(alertActions.addAlert(alert));
    });
};

const generalCreateOrEditOperation = (api: Function, cbOnSuccess?: Function) => (dispatch: Dispatch<any>) => {
  dispatch(actions.setLoading(true));
  api()
    .then((res: AxiosResponse) => {
      dispatch(actions.setLoading(false));

      const alert: IAlert = { type: 'success', id: Math.random().toString(), message: res.data.info };
      dispatch(alertActions.addAlert(alert));

      if (cbOnSuccess) {
        cbOnSuccess(res.data.data, dispatch, res);
      }
    })
    .catch((err: AxiosError) => {
      const messageInfo = err?.response?.data?.info || err.message;
      const alert: IAlert = { type: 'danger', id: Math.random().toString(), message: messageInfo };
      dispatch(alertActions.addAlert(alert));
      dispatch(actions.setLoading(false));
    });
};

export default { fetchOperationWithLoading, generalCreateOrEditOperation };
