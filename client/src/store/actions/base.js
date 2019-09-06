import {
    BUILDING_TYP_LVL_DOWN,
    BUILDING_TYP_LVL_UP,
    CHANGE_FRACTION,
    BASE_CHANGE_DEFAULT_LVL,
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
        if (
            unit.type === 't' ||
            unit.type === 'c' ||
            (area === 'defense' && 'hjkl'.includes(unit.type))
        )
            unit.lvl = undefined;
        else if (!unit.lvl) unit.lvl = getStore().base.baseLvl;
        dispatch({
            type: REPLACE_SLOT,
            unit,
            area,
        });
    };
}

export function replaceArea(area) {
    return (dispatch, getStore) => {
        const { base } = getStore();
        console.log({ base, area });
        base[area] = [
            ...base[area].map((b, i) => {
                const slot = { slot: i };
                if (area === 'buildings') {
                    if (b.type === 't' || b.type === 'c') slot.type = b.type;
                    if (b.type === 'h') slot.type = 't';
                    if (b.type === 'n') slot.type = 'c';
                }
                if (area === 'defense') {
                    if ('hjkl'.includes(b.type)) slot.type = b.type;
                }
                return slot;
            }),
        ];
        console.log(base);
        dispatch({
            type: REPLACE_ALL_BASE,
            base,
        });
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

export function buildingsUp(buildingType) {
    return {
        type: BUILDING_TYP_LVL_UP,
        buildingType,
    };
}

export function buildingsDown(buildingType) {
    return {
        type: BUILDING_TYP_LVL_DOWN,
        buildingType,
    };
}

export const changeBaseLvl = lvl => {
    return {
        type: BASE_CHANGE_DEFAULT_LVL,
        lvl,
    };
};
