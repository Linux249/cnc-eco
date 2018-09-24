import {CHANGE_ALLIANCE, CHANGE_PLAYER, CHANGE_WORLD} from '../constants/actionTypes'


export function changePlayer(player) {
    return {
        type: CHANGE_PLAYER,
        pl: player
    }
}


export function changeWorld(world) {
    return {
        type: CHANGE_WORLD,
        w: world
    }
}


export function changeAlliance(alliance) {
    return {
        type: CHANGE_ALLIANCE,
        a: alliance
    }
}


