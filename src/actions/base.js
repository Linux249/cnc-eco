import {copyObj} from '../services/util'

export const REPLACE_BUILDING = "REPLACE_BUILDING" // ad a new building a current location
export const REPLACE_ALL_BASE = "REPLACE_ALL_BASE" // ad a new building a current location
export const REPLACE_BASE_FROM_URL = "REPLACE_BASE_FROM_URL" // ad a new building a current location
export const CHANGE_FRACTION = "CHANGE_FRACTION"
export const BUILDING_TYP_UP = "BUILDING_TYP_UP"
export const BUILDING_TYP_DOWN = "BUILDING_TYP_DOWN"

// number where the building is set is inside building.slot
export function replaceBuilding(building) {
    building =  copyObj(building)
    return {
        type: REPLACE_BUILDING,
        building
    }
}

export function replaceAllBase(base) {
    return {
        type: REPLACE_ALL_BASE,
        base
    }
}

export function replaceBaseFromUrl(url) {
    return {
        type: REPLACE_BASE_FROM_URL,
        url
    }
}

export function changeFraction(faction) {
    return {
        type: CHANGE_FRACTION,
        faction
    }
}

export function buildingsUp(building) {
    return {
        type: BUILDING_TYP_UP,
        building
    }
}

export function buildingsDown(building) {
    return {
        type: BUILDING_TYP_DOWN,
        building
    }
}

