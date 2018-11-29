import {
    PLAYER_CHANGE_LOADING,
    PLAYER_CHANGE_WORLD,
    PLAYER_UPDATE, PLAYER_UPDATE_ALLIANCE_ID,
    PLAYER_UPDATE_BASES
} from '../constants/actionTypes'

const initState = {
    a: 126,
    w: 373, // Toggle for showing help everywhere or not
    pl: 'Linux249',
    name: '',
    allianceId: null,
    worlds: [
        { worldName: 'dumm' },
        { worldName: 'dumm with' },
        { worldName: 'dumm with some' },
        { worldName: 'dumm with some löonger' },
        { worldName: 'dumm with some löonger name' },
    ],
    bases: [],
    selectedWorld: 0,
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
        default:
            return state;
    }
}
