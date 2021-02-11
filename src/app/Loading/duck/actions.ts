import { ADD_PENDING_REQUEST, REMOVE_PENDING_REQUEST, AddPengingRequestAction, RemovePendingRequestAction } from './types';

const addPendingRequest = (): AddPengingRequestAction => ({
  type: ADD_PENDING_REQUEST,
});

const removePendingRequest = (): RemovePendingRequestAction => ({
  type: REMOVE_PENDING_REQUEST,
});

export default {
  addPendingRequest,
  removePendingRequest,
};
