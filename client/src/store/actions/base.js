import {
    BUILDING_TYP_DOWN,
    BUILDING_TYP_UP,
    CHANGE_FRACTION,
    BASE_CHANGE_BASELVL,
    REPLACE_ALL_BASE,
    REPLACE_BASE_FROM_URL,
    REPLACE_SLOT,
    SWITCH_SLOT,
} from '../constants/actionTypes'; // ad a new building a current location
// ad a new building a current location
// ad a new building a current location

// number where the building is set is inside building.slot
export function replaceSlot(unit, area = 'buildings') {
    return (dispatch, getStore) => {
        if( unit.type === 't' || unit.type === 'c') unit.lvl = undefined
        else if(!unit.lvl ) unit.lvl = getStore().base.baseLvl
        dispatch({
            type: REPLACE_SLOT,
            unit,
            area
        })
    };
}

export function switchSlot(from, to, area) {
    return {
        type: SWITCH_SLOT,
        from: { ...from },
        to: { ...to },
        area,
    };
}

export function replaceAllBase(base) {
    return {
        type: REPLACE_ALL_BASE,
        base,
    };
}

export function replaceBaseFromUrl(url) {
    return {
        type: REPLACE_BASE_FROM_URL,
        url,
    };
}

export function changeFraction(faction) {
    return {
        type: CHANGE_FRACTION,
        faction,
    };
}

export function buildingsUp(building) {
    return {
        type: BUILDING_TYP_UP,
        building,
    };
}

export function buildingsDown(building) {
    return {
        type: BUILDING_TYP_DOWN,
        building,
    };
}

export const changeBaseLvl = lvl => {
    return {
        type: BASE_CHANGE_BASELVL,
        lvl,
    };
};
