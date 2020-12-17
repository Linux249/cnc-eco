import {
    PLAYER_CHANGE_LOADING,
    PLAYER_CHANGE_WORLD,
    PLAYER_UPDATE_BASES,
    PLAYER_UPDATE,
    // PLAYER_UPDATE_ALLIANCE_ID,
    PLAYER_CHANGE_SELECTED_BASE,
} from '../constants/actionTypes';
import { LOCAL_STORE } from '../../config';
import { replaceBaseFromUrl } from './base';

// export function changeWorld(world) {
//     return async (dispatch) => {
//         const data = JSON.parse(localStorage.getItem(LOCAL_STORE));
//         data.world = world;
//         localStorage.setItem(LOCAL_STORE, JSON.stringify(data));
//         await dispatch({
//             type: PLAYER_CHANGE_WORLD,
//             w: world.worldId,
//             worldName: world.worldName,
//         });
//         dispatch(changeLoading(true));
//
//         // todo requqest player data
//         const url = api_url + '/player?player=' + world.player_id + '&world=' + world.worldId;
//         const player = await fetch(url, {
//             headers: new Headers({
//                 Authorization: 'Bearer  ' + getStore().auth.token,
//             }),
//         }).then(res => res.json());
//         console.log({ player });
//         player.bases && dispatch(updateBases(player.bases));
//         player.allianceId && dispatch(updateAllianceId(player.allianceId));
//         dispatch(changeLoading(false));
//     };
// }

export function changeWorld(world) {
    return {
        type: PLAYER_CHANGE_WORLD,
        w: world.worldId,
        worldName: world.worldName,
        allianceId: world.allianceId,
        _id: world.player_id,
        playerId: world.playerId,
    };
}

export const updateBases = bases => {
    return {
        type: PLAYER_UPDATE_BASES,
        bases,
    };
    // return dispatch => {
    // const base = bases[0]; // action create is only used after player update

    // dispatch({
    //     type: PLAYER_UPDATE_BASES,
    //     bases,
    // });
    // dispatch({
    //     type: REPLACE_BASE_FROM_URL,
    //     url: base.layout,
    // });
    // };
};

// export const updateAllianceId = allianceId => {
//     return {
//         type: PLAYER_UPDATE_ALLIANCE_ID,
//         allianceId,
//     };
// };

export const updatePlayer = (user, save = false) => {
    // todo because this action is used after updateWorlds and addPlayerName it need a localStorage
    //  update. But it is also used on initial loading where data come from localStorage => a save flag
    //  is a quick solution until the actions are refactored for a bedder fit to current usage.
    //  Ideas: user actions/reducer instead of auth; updatePlayerName, updateWorlds actions with save to localStorage
    // update data in store
    if(save) {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORE));
        data.user = user
        localStorage.setItem(LOCAL_STORE, JSON.stringify(data));
    }
    return (dispatch, getState) => {
        dispatch({
            type: PLAYER_UPDATE,
            name: user.player,
            worlds: user.worlds,
        });
        // check if the world id changed - usefully for initial loading kick
        const { w } = getState().player;
        if (!w && user.worlds[0]) dispatch(changeWorld(user.worlds[0]));
    };
};

export function changeLoading(loading) {
    return {
        type: PLAYER_CHANGE_LOADING,
        loading,
    };
}

export function changeBase(base, i) {
    return (dispatch, getStore) => {
        dispatch({
            type: PLAYER_CHANGE_SELECTED_BASE,
            i,
        });
        dispatch(replaceBaseFromUrl(base.layout));
    };
}
