import {
    BUILDING_TYP_DOWN,
    BUILDING_TYP_UP,
    CHANGE_FRACTION,
    REPLACE_ALL_BASE,
    REPLACE_BASE_FROM_URL,
    REPLACE_BUILDING,
} from '../constants/actionTypes'; // ad a new building a current location
// ad a new building a current location
// ad a new building a current location

// number where the building is set is inside building.slot
export function replaceBuilding(building) {
    //building = copyObj(building);
    return {
        type: REPLACE_BUILDING,
        building: {
            ...building
        }
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
