import reducer from './reducers';
import api_php from './api_php';
import api_node from './api_node';

export { default as operations } from './operations';
export { default as actions } from './actions';

export const apiEndPoint = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;
export { apiEndPoint as api };

export default reducer;
