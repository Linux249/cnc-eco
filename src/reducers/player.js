import update from 'immutability-helper'
import {
    CHANGE_PLAYER,
    CHANGE_WORLD,
    CHANGE_ALLIANCE
} from '../actions/player'

const initState = {
    a: 126,
    w: 379,      // Toggle for showing help everywhere or not
    pl: "Linux249"
}

export function player(state = initState, action) {
    switch (action.type) {
        case CHANGE_PLAYER:
            return update(state, {pl: {$set: action.pl}})
        case CHANGE_ALLIANCE:
            return update(state, {a: {$set: action.a}})
        case CHANGE_WORLD:
            return update(state, {w: {$set: action.w}})
        default:
            return state
    }
}