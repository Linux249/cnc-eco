import update from 'immutability-helper'
import { CHANGE_ALLIANCE } from '../constants/actionTypes'
import {CHANGE_PLAYER, CHANGE_WORLD} from '../constants/actionTypes'

const initState = {
    a: 126,
    w: 379,      // Toggle for showing help everywhere or not
    pl: "Linux249"
}

export function player(state = initState, action) {
    switch (action.type) {
        case CHANGE_PLAYER:
            return {
                ...state,
                pl: action.pl
            }
        case CHANGE_ALLIANCE:
            return {
                ...state,
                a: action.a
            }
        case CHANGE_WORLD:
            return {
                ...state,
                w: action.w
            }
        default:
            return state
    }
}