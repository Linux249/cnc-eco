import update from 'immutability-helper'
import urlToBase from '../../util/parseurl'
import {
    REPLACE_BUILDING,
    REPLACE_ALL_BASE,
    REPLACE_BASE_FROM_URL,
    CHANGE_FRACTION,
    BUILDING_TYP_UP,
    BUILDING_TYP_DOWN
} from '../actions/base'

const initBase = urlToBase("http://cncopt.com/?map=2|N|N|-fix-|.........12p12p12p.14r12h20s12h.12p24a12p12p16r12h27s12h.12p20p12p.14r12h20s12h.12p24a12p......12p12p12p.12n17s....cc.12n17s12nc..........j37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy")

export function base(state = initBase, action) {
    switch (action.type) {

        case REPLACE_BUILDING:
            const building = action.building
            return update(state, {buildings: {[building.slot]: {$set: building}}})
        case REPLACE_ALL_BASE:
            return update(state, {$set: action.base})
        case REPLACE_BASE_FROM_URL:
            const base = urlToBase(action.url)
            return update(state, {$set: base})
        case CHANGE_FRACTION:
            return update(state, {faction: {$set: action.faction}})
        case BUILDING_TYP_UP:
            return {
                ...state,
                buildings: state.buildings.map(slot => {
                    let { lvl } = slot
                    if(lvl) {
                        lvl += 1
                        if(lvl > 65) lvl = 65
                        if (slot.type === action.building) return update(slot, {lvl: {$set: lvl}})
                    }
                    return slot
                })
            }
        case BUILDING_TYP_DOWN:
            return {
                ...state,
                buildings: state.buildings.map(slot => {
                    let { lvl } = slot
                    if(lvl) {
                        lvl -= 1
                        if(lvl < 12) lvl = 12
                        if (slot.type === action.building) return update(slot, {lvl: {$set: lvl}})
                    }
                    return slot
                })
            }
        default:
            return state
    }
}