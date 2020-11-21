import types from './types';
import { combineReducers } from 'redux';

const platformsReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_PLATFORMS:
            return payload;
        default:
            return state;
    }
};

const releasesReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_RELEASES:
            return payload;
        default:
            return state;
    }
};

const fuamGroupsReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_FUAM_GROUPS:
            return payload;
        default:
            return state;
    }
};

const environmentsReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_ENVIRONMENTS:
            return payload;
        default:
            return state;
    }
};

const logicalGroupsReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_LOGICAL_GROUPS:
            return payload;
        default:
            return state;
    }
};

const tagsReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_TAGS:
            return payload;
        default:
            return state;
    }
};

export default combineReducers({
    releases: releasesReducer,
    platforms: platformsReducer,
    fuamGroups: fuamGroupsReducer,
    environments: environmentsReducer,
    logicalGroups: logicalGroupsReducer,
    tags: tagsReducer
});
