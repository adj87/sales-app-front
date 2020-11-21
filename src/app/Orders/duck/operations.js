import api_php from './api_php';
import api_php from './api_php';
import actions from './actions';
import {
  generalFetchOperation,
  generalDeleteOperation,
  generalCreateOrEditOperation,
} from '../../../utils/fetchHandlerOperation';
import Axios from 'axios';

const fetchReleases = (idProject) =>
  generalFetchOperation(() => api.fetchReleases(idProject), actions.setReleases);

export default {
  createRelease,
  updateRelease,
  deleteRelease,
  fetchReleases,
  fetchAllForModal,
  fetchEnvironments,
  fetchLogicalGroups,
  setTags,
  resetAll,
  setLogicalGroups,
  setEnvironments,
};
