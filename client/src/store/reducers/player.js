import {
    PLAYER_CHANGE_LOADING,
    PLAYER_CHANGE_SELECTED_BASE,
    PLAYER_CHANGE_WORLD,
    PLAYER_UPDATE,
    PLAYER_UPDATE_ALLIANCE_ID,
    PLAYER_UPDATE_BASES,
} from '../constants/actionTypes';

const initState = {
    a: 0, // todo why are here two places 4 ally id?
    w: null, // Toggle for showing help everywhere or not
    worldName: '', // Toggle for showing help everywhere or not
    name: '',
    allianceId: 0,
    worlds: [],
    bases: [],
    selectedBase: 0,
    loading: false,
};

export function player(state = initState, action) {
    switch (action.type) {
        case PLAYER_CHANGE_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case PLAYER_CHANGE_WORLD:
            return {
                ...state,
                w: action.w,
                worldName: action.worldName,
                selectedBase: 0,
            };
        case PLAYER_UPDATE:
            return {
                ...state,
                name: action.name,
                worlds: action.worlds,
            };
        case PLAYER_UPDATE_BASES:
            return {
                ...state,
                bases: action.bases,
            };
        case PLAYER_UPDATE_ALLIANCE_ID:
            return {
                ...state,
                allianceId: action.allianceId,
            };
        case PLAYER_CHANGE_SELECTED_BASE:
            return {
                ...state,
                selectedBase: action.i,
            };
        default:
            return state;
    }
}
