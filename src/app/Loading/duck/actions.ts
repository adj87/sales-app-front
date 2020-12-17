import { SET_LOADING, SetLoadingAction } from './types';

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: loading,
});

export default {
  setLoading,
};
