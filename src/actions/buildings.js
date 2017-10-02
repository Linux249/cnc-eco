/**
 * Created by Bombassd on 27.04.2017.
 */
import {calcProduction} from './production'
//import { showBuildingMenu } from './menu'
import {buildingKeys} from './../util/buildings'
import {urlToBase} from '../util/parseurl'
//import {removeBuilding} from './base'

// const initial_state = urlToBase("http://cncopt.com/?map=2|N|N|-fix-|.........12p12p12p.14r20h20s20h.12p24a12p12p16r20h27s20h.12p20p12p.14r20h20s20h.12p24a12p......12p12p12p.12n17s....cc.12n17s12nc..........j37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy")
// console.log("VOR PRODUKTION")

/*export function updateBuildingsFromURL(url)
{
    const { buildings }= urlToBase("http://cncopt.com/?map=" + url )

    console.log("action")
    console.log(url)
    console.log(buildings)
    return {
        type: 'UPDATE_ALL_BUILDINGS',
        buildings
    }
}*/

export function keyInputBase(e,from, building)
{
    return (dispatch) => {
        const key = e.key
        console.log("KEY PRESSED: " + key)
        console.log({
            building
        })
        /*if (key === "t" || key === "c") dispatch(changeBuilding(from, key, -1))
        else if (buildingKeys.indexOf(key) !== -1) {
            dispatch(changeBuilding(from, key))
        } else if(Object.keys(building).length) {
            if (key === "+")  //builing lvl up
            {
                dispatch(changeBuilding(from, building.type, building.lvl + 1))

            } else if (key === "-")     //builing lvl down
            {
                dispatch(changeBuilding(from, building.type, building.lvl - 1))
            } else if (key.match(/^[0-9]+$/))   // new  lvl by number
            {
                let lvl = building.lvl + key
                if(lvl.length > 2) lvl = lvl.slice(-2)
                if(lvl === "00") dispatch(removeBuilding(from))
                else dispatch(changeBuilding(from, building.type, lvl))

            }
        }*/
    }

}

// t is type like a,s, p,c
/*export function changeBuilding(from, t, lvl) {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_BUILDING',
            from,
            t,
            lvl
        })
        dispatch(calcProduction())
    }
}*/


