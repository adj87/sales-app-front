import axios from 'axios';

const API_END_POINT = process.env.REACT_APP_API_END_POINT;
const API_RELEASES = `${API_END_POINT}lanzamiento`;
const API_PLATFORMS = `${API_END_POINT}fusai/plataformas`;
const API_LOGICAL_GROUPS = (idEnvironment, idPlatform) => `${API_END_POINT}fusai/gruposLogicos/entorno/${idEnvironment}/plataforma/${idPlatform}`;
const API_ENVIRONMENTS = `${API_END_POINT}fusai/entornos/plataforma`;
const API_FUAM_GROUPS = `${API_END_POINT}fuam/grupos`;
const API_TAGS = `${API_END_POINT}etiqueta`;

const fetchReleases = (idProject) => {
    const url = `${API_RELEASES}/proyecto/${idProject}`;
    return axios.get(url);
};

const deleteRelease = (id) => {
    const url = `${API_RELEASES}/${id}`;
    return axios.delete(url);
};

const createRelease = (values, idProject) => {
    const url = `${API_RELEASES}`;
    return axios.post(url, { ...values, proyecto: idProject });
};

const updateRelease = (values) => {
    const url = `${API_RELEASES}/${values.id}`;
    return axios.put(url, values);
};

const fetchPlatforms = (query) => {
    const url = `${API_PLATFORMS}`;
    return axios.get(url);
};

const fetchEnvironments = (idPlatform) => {
    const url = `${API_ENVIRONMENTS}/${idPlatform}`;
    return axios.get(url);
};

const fetchLogicalGroups = (environmentId, platformId) => {
    const url = `${API_LOGICAL_GROUPS(environmentId, platformId)}`;
    return axios.get(url);
};

const fetchFuamGroups = () => {
    const url = `${API_FUAM_GROUPS}`;
    return axios.get(url);
};

const fetchTags = (idProject) => {
    const url = `${API_TAGS}/proyecto/${idProject}`;
    return axios.get(url);
};

export default {
    createRelease,
    updateRelease,
    deleteRelease,
    fetchReleases,
    fetchPlatforms,
    fetchEnvironments,
    fetchLogicalGroups,
    fetchFuamGroups,
    fetchTags
};
