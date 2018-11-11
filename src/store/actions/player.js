import {
    CHANGE_ALLIANCE, CHANGE_LOADING,
    CHANGE_PLAYER,
    CHANGE_WORLD,
    PLAYER_UPDATE
} from '../constants/actionTypes'

export function changePlayer(player) {
    return {
        type: CHANGE_PLAYER,
        pl: player,
    };
}

export function changeWorld(worldId) {
    return {
        type: CHANGE_WORLD,
        w: worldId,
    };
}

export function changeAlliance(alliance) {
    return {
        type: CHANGE_ALLIANCE,
        a: alliance,
    };
}

export const updatePlayer = user => {
    return dispatch => {
        dispatch({
            type: PLAYER_UPDATE,
            name: user.player,
            worlds: user.worlds,
        })
        dispatch(changeloading(true))
        dispatch(changeloading(false))
    };
};

export function changeloading(loading) {
    return {
        type: CHANGE_LOADING,
        loading,
    };
}
