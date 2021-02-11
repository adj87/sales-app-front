const SECTION = 'LOADING_';
export const ADD_PENDING_REQUEST = SECTION + 'ADD_PENDING_REQUEST';
export const REMOVE_PENDING_REQUEST = SECTION + 'REMOVE_PENDING_REQUEST';

export interface AddPengingRequestAction {
  type: typeof ADD_PENDING_REQUEST;
}

export interface RemovePendingRequestAction {
  type: typeof REMOVE_PENDING_REQUEST;
}
