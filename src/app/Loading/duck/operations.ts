import actions from './actions';
import { AnyAction } from 'redux';

import { Dispatch } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

const fetchOperationWithLoading = (
  api: Function,
  setterAction: any,
  cbOnSuccess?: Function,
  noLoading?: boolean,
) => (dispatch: Dispatch<any>) => {
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

      /*                 dispatch(
                    alertsOperations.addError({
                        statusErrorText: getStatusErrorText(err),
                        statusError: ''
                    })
                ); */
    });
};

export const generalCreateOrEditOperation = (api: Function, cbOnSuccess: Function) => (
  dispatch: Dispatch<any>,
) => {
  dispatch(actions.setLoading(true));
  api()
    .then((res: AxiosResponse) => {
      dispatch(actions.setLoading(false));
      if (res.data.status === 'OK') {
        /*     dispatch(); */
        /*           alertsOperations.addSuccess({
            statusError: '',
            statusErrorText: res.data.info,
          }), */
      } else {
        /* dispatch(); */
        /*           alertsOperations.addError({
            statusError: '',
            statusErrorText: res.data.info,
          }), */
      }
      if (cbOnSuccess) {
        cbOnSuccess(res, dispatch);
      }
    })
    .catch((err: AxiosError) => {
      dispatch(actions.setLoading(false));
    });
};

export default { fetchOperationWithLoading };
