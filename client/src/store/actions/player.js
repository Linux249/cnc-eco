import {
    PLAYER_CHANGE_LOADING,
    PLAYER_CHANGE_WORLD,
    PLAYER_UPDATE_BASES,
    PLAYER_UPDATE,
    PLAYER_UPDATE_ALLIANCE_ID,
    REPLACE_BASE_FROM_URL,
    PLAYER_CHANGE_SELECTED_BASE,
} from '../constants/actionTypes';
import { api_url, LOCAL_STORE } from '../../config';
import { replaceBaseFromUrl } from './base';

export function changeWorld(world) {
    return async (dispatch, getStore) => {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORE));
        data.world = world;
        localStorage.setItem(LOCAL_STORE, JSON.stringify(data));
        await dispatch({
            type: PLAYER_CHANGE_WORLD,
            w: world.worldId,
            worldName: world.worldName,
        });
        dispatch(changeLoading(true));

        // todo requqest player data
        const url = api_url + '/player?player=' + world.player_id + '&world=' + world.worldId;
        const player = await fetch(url, {
            headers: new Headers({
                Authorization: 'Bearer  ' + getStore().auth.token,
            }),
        }).then(res => res.json());
        console.log({ player });
        player.bases && dispatch(updateBases(player.bases));
        player.allianceId && dispatch(updateAllianceId(player.allianceId));
        dispatch(changeLoading(false));
    };
}

export const updateBases = bases => {
    return {
        type: PLAYER_UPDATE_BASES,
        bases,
    }
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

export const updateAllianceId = allianceId => {
    return {
        type: PLAYER_UPDATE_ALLIANCE_ID,
        allianceId,
    };
};

export const updatePlayer = user => {
    // update data in store
    const data = JSON.parse(localStorage.getItem(LOCAL_STORE));
    data.user = user;
    localStorage.setItem(LOCAL_STORE, JSON.stringify(data));
    return (dispatch, getState) => {
        dispatch({
            type: PLAYER_UPDATE,
            name: user.player,
            worlds: user.worlds,
        });
        // check if the world id changed - usefully for initial loading kick
        const { w } = getState().player;
        const world = data.world || user.worlds[0];
        if (world && w !== world.worldId) dispatch(changeWorld(world));
    };
};

export function changeLoading(loading) {
    return {
        type: PLAYER_CHANGE_LOADING,
        loading,
    };
}

export function changeBase(i) {
    return (dispatch, getStore) => {
        const { bases } = getStore().player;
        const base = bases[i];
        dispatch({
            type: PLAYER_CHANGE_SELECTED_BASE,
            i,
        });
        dispatch(replaceBaseFromUrl(base.layout));
    };
}
