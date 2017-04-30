/**
 * Created by Bombassd on 27.04.2017.
 */
import { calcProduction } from './production'
import { showBuildingMenu } from './menu'
import nod_buildings_keys from '../util/nod_buildings_keys.json'

export function deleteBuilding(from)
{
    return {
        type: 'DELETE_BUILDING',
        from
    }
}

export function keyInputBase(e,from, building)
{
    return (dispatch) => {
        const key = e.key
        console.log("KEY PRESSED: " + key)
        console.log({
            building
        })
        if (key in nod_buildings_keys) {
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
                if(lvl === "00") dispatch(deleteBuilding(from))
                else dispatch(changeBuilding(from, building.type, lvl))

            }
        }
    }

}

// t is type like a,s, p,c
export function changeBuilding(from, t, lvl) {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_BUILDING',
            from,
            t,
            lvl
        })
        dispatch(calcProduction())
    }
}

export function switchBuildings(from, to) {
    return (dispatch, getState) => {
        const {buildings} = getState()
        const temp = buildings[from]
        buildings[from] = buildings[to]
        buildings[to] = temp
        // dispatch({
        //     type: "SWITCH_BUILDINGS",
        //     from,
        //     to
        // })
        dispatch(calcProduction())
    }
}


