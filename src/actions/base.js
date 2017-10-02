import {copyObj} from '../services/util'

export const REPLACE_BUILDING = "REPLACE_BUILDING" // ad a new building a current location
export const REPLACE_ALL_BASE = "REPLACE_ALL_BASE" // ad a new building a current location
export const REMOVE_BUILDING = "REMOVE_BUILDING" // remove/reset building
export const SET_BUILDING_LVL = "SET_BUILDING_LVL" //
export const LVL_BUILDING_UP = "LVL_BUILDING_UP" //
export const LVL_BUILDING_DOWN = "LVL_BUILDING_DOWN" //


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

export function removeBuilding(slot) {
    return {
        type: REMOVE_BUILDING,
        slot
    }
}

