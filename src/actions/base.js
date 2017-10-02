import {copyObj} from '../services/util'

export const REPLACE_BUILDING = "REPLACE_BUILDING" // ad a new building a current location
export const REPLACE_ALL_BASE = "REPLACE_ALL_BASE" // ad a new building a current location
export const CHANGE_FRACTION = "CHANGE_FRACTION"


// number where the building is set is inside building.slot
export function replaceBuilding(building) {
    return {
        type: REPLACE_BUILDING,
        building: copyObj(building)
    }
}

export function replaceAllBase(base) {
    return {
        type: REPLACE_ALL_BASE,
        base
    }
}

export function changeFraction(faction) {
    return {
        type: CHANGE_FRACTION,
        faction
    }
}

