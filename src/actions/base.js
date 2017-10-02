import {copyObj} from '../services/util'

export const REPLACE_BUILDING = "REPLACE_BUILDING" // ad a new building a current location
export const REPLACE_ALL_BUILDINGS = "REPLACE_ALL_BUILDINGS" // ad a new building a current location
export const REMOVE_BUILDING = "REMOVE_BUILDING" // remove/reset building
export const SWITCH_BUILDINGS = "SWITCH_BUILDINGS" // remove/reset building
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

export function replaceAllBuildings(buildings) {
    return {
        type: REPLACE_ALL_BUILDINGS,
        buildings
    }
}

export function removeBuilding(slot) {
    return {
        type: REMOVE_BUILDING,
        slot
    }
}

export function switchBuildings(dragged, drop) {
    console.log({dragged, drop})
    return {
        type: SWITCH_BUILDINGS,
        from: dragged,
        to: drop
    }
}