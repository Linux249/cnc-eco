import { reducerCall } from './index';

import { urlToBase } from './../util/parseurl.js'

const initial_state = urlToBase("http://cncopt.com/?map=2|N|N|-fix-|20s37w.38y.50e...26p26p26p26p26p42h47s42h.26p52a26p52a26p42h54s42h.26p26p26p26p26p42h46s42h.26p52a26p50a31p40b...31p35p35p38pc.....cc.c.cc.43f.46d..37q..20sj37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy"
)

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
        new_state.showBuildingMenu = true
        new_state.buildingMenuIsFrom = action.from ? action.from : new_state.buildingMenuIsFrom
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
        new_state.showBuildingMenu = false
        return new_state;
    }

    static buildingSelect(new_state, action)
    {
        new_state.buildings[new_state.buildingMenuIsFrom] = {
            lvl: 38,
            name : action.name,
            slot: 49,
            type: "p",
            x: 4.,
            y: 6
        }

        return new_state
    }

    static buildingDelete(new_state, action)
    {
        new_state.buildings[action.from] = {}
        return new_state
    }
   /* static delete(new_state, action)
     {
         for (const index in new_state.list) {
             if (new_state.list[index].id === action.id) {
                new_state.list.splice(index, 1);
                 break;
             }
         }
         return new_state;
     }*/
}

/**
 * Users reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function menu(state = initial_state, action) {
    console.log("****STATE****")
    console.log(state)
    return reducerCall(state, action, reducerClass);
}

