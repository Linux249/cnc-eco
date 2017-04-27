/**
 * Created by Bombassd on 26.04.2017.
 */
import { urlToBase } from './../util/parseurl.js'

const initState = urlToBase("http://cncopt.com/?map=2|N|N|-fix-|.........12p12p12p.14r12h20s12h.12p24a12p12p16r12h27s12h.12p20p12p.14r12h20s12h.12p24a12p......12p12p12p.12n17s....cc.12n17s12nc..........j37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy")
console.log(initState)

export function buildings(state = initState, action) {

    //newState[newState.menu.from].type = action.t
    switch (action.type) {
        case 'CHANGE_BUILDING':
            return state.map((building, i) => {
                if(i == action.from) return {
                    ...building,
                    name: action.name,
                    type: action.t,
                    lvl: building.lvl || action.lvl
                }
                else return building
            })

        case 'SWITCH_BUILDINGS':
            return state.map((building, i, old) => {
                if(i === action.to) console.log("hier wurde gedrpt")
                //if(i == action.from) return old[action.to]
                return building
            })


        default:
            return state
    }
}