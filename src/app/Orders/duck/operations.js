import api from './api';
import actions from './actions';
import { generalFetchOperation, generalDeleteOperation, generalCreateOrEditOperation } from '../../../utils/fetchHandlerOperation';
import Axios from 'axios';

const fetchAllForModal = (values) => {
    //EDIT MODE
    if (values.id) {
        return generalFetchOperation(
            () =>
                Axios.all([
                    api.fetchPlatforms(),
                    api.fetchFuamGroups(),
                    api.fetchTags(values.proyecto),
                    api.fetchEnvironments(values.plataforma),
                    api.fetchLogicalGroups(values.entorno, values.plataforma)
                ]),
            null,
            ([platforms, fuamGroups, tags, environments, logicalGroups], dispatch) => {
                dispatch(actions.setLogicalGroups(logicalGroups.data.data));
                dispatch(actions.setPlatforms(platforms.data.data));
                dispatch(actions.setEnvironments(environments.data.data));
                dispatch(actions.setFuamGroups(fuamGroups.data.data));
                dispatch(actions.setTags(tags.data.data));
            }
        );
    } else {
        //CREATE MODE
        return generalFetchOperation(
            () => Axios.all([api.fetchPlatforms(), api.fetchFuamGroups(), api.fetchTags(values.proyecto)]),
            null,
            ([platforms, fuamGroups, tags], dispatch) => {
                dispatch(actions.setPlatforms(platforms.data.data));
                dispatch(actions.setFuamGroups(fuamGroups.data.data));
                dispatch(actions.setTags(tags.data.data));
            }
        );
    }
};
const fetchReleases = (idProject) => generalFetchOperation(() => api.fetchReleases(idProject), actions.setReleases);

const deleteRelease = (id, row) =>
    generalDeleteOperation(
        () => api.deleteRelease(id),
        (res, dispatch) => fetchReleases(row.proyecto)(dispatch)
    );

const fetchEnvironments = (platformId) =>
    generalFetchOperation(
        () => api.fetchEnvironments(platformId),
        actions.setEnvironments,
        (res, dispatch) => dispatch(actions.setLogicalGroups([]))
    );
const createRelease = (values) =>
    generalCreateOrEditOperation(
        () => api.createRelease(values, values.proyecto),
        (res, dispatch) => fetchReleases(values.proyecto)(dispatch)
    );
const updateRelease = (values) =>
    generalCreateOrEditOperation(
        () => api.updateRelease(values),
        (res, dispatch) => fetchReleases(values.proyecto)(dispatch)
    );

const resetAll = () => (dispatch) => {
    dispatch(actions.setEnvironments([]));
    dispatch(actions.setFuamGroups([]));
    dispatch(actions.setLogicalGroups([]));
    dispatch(actions.setPlatforms([]));
    dispatch(actions.setTags([]));
};

const fetchLogicalGroups = (environmentId, platformId) => generalFetchOperation(() => api.fetchLogicalGroups(environmentId, platformId), actions.setLogicalGroups);

const setTags = (tags) => (dispatch) => dispatch(actions.setTags(tags));
const setLogicalGroups = (logicalGroups) => (dispatch) => dispatch(actions.setLogicalGroups(logicalGroups));
const setEnvironments = (envs) => (dispatch) => dispatch(actions.setEnvironments(envs));

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
    setEnvironments
};
