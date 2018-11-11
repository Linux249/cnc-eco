import {
    PLAYER_CHANGE_LOADING,
    PLAYER_CHANGE_WORLD,
    PLAYER_UPDATE
} from '../constants/actionTypes'

export function changeWorld(worldId) {
    return {
        type: PLAYER_CHANGE_WORLD,
        w: worldId,
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
        type: PLAYER_CHANGE_LOADING,
        loading,
    };
}
