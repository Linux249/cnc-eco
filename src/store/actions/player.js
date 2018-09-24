export const CHANGE_PLAYER = "CHANGE_PLAYER"
export const CHANGE_WORLD = "CHANGE_WORLD"
export const CHANGE_ALLIANCE = "CHANGE_ALLIANCE"


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


