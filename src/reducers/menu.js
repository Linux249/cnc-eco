import { reducerCall } from './index';

import { urlToBase } from './../util/parseurl.js'
import { calcBaseProduction } from '../util/production.js'

const initial_state = urlToBase("http://cncopt.com/?map=2|N|N|-fix-|20s37w.38y.50e...26p26p26p26p26p42h47s42h.26p52a26p52a26p42h54s42h.26p26p26p26p26p42h46s42h.26p52a26p50a31p40b...31p35p35p38pc.....cc.c.cc.43f.46d..37q..20sj37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy")


/**
 * Reducer static class
 */
class reducerClass
{
    /**
     * Show the delete prompt
     *
     * @param new_state
     * @param action
     * @returns {*}
     */
    static buildingMenuShow(new_state, action)
    {
        new_state.buildingMenu.show = true
        new_state.buildingMenu.from = action.from ? action.from : new_state.buildingMenu.from
        return new_state;
    }

    /**
     * Hide the delete prompt
     *
     * @param new_state
     * @param action
     * @returns {*}
     */
    static buildingMenuHide(new_state, action)
    {
        new_state.buildingMenu.show = false
        return new_state;
    }

    static buildingSelect(new_state, action)
    {
        const slot = action.slot || new_state.buildingMenu.from
        new_state.buildings[slot] = {
            lvl: action.lvl || new_state.buildingMenu.lvl, //TODO lvl from other state
            name : action.name,
            slot,
            type: action.id,
            x: 4,       //TODO get x + y from caller
            y: 6
        }

        new_state.production = calcBaseProduction(new_state.buildings)
        return new_state
    }

    static buildingDelete(new_state, action)
    {
        new_state.buildings[action.from] =  {}
        new_state.production = calcBaseProduction(new_state.buildings)
        return new_state
    }

    static changeBuildingLvl(new_state, action)
    {
        console.log(action.lvl)
        console.log(action.from)

        new_state.buildings[action.from].lvl = action.lvl
        new_state.production = calcBaseProduction(new_state.buildings)
        return new_state
    }
}

/**
 * Users reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function menu(state = initial_state, action) {
/*    console.log("****STATE****")
    console.log(state)*/
    return reducerCall(state, action, reducerClass);
}

