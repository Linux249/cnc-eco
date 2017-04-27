/**
 * Created by Bombassd on 27.04.2017.
 */

// t is type like a,s, p,c
export function changeBuilding(t, name) {

    // TODO TYPE OR NAME || from variable?
    return (dispatch, getState) => {
        const { menu  }= getState()

        return dispatch({
            type: 'CHANGE_BUILDING',
            from: menu.from,
            t,
            name,
            lvl: menu.lvl

        })
    }
}

export function changeBuildingLvl(event, from) {
    // console.log("Level geändert - reducers/menu_old.js")
    // console.log(action.lvl)
    // console.log(action.from)
    // if (action.lvl.length > 2 ) action.lvl = action.lvl.slice(-2) // last 2 numbers
    // action.lvl = Number.parseInt(action.lvl, 10)
    // if (action.lvl > 65) action.lvl = 65
    // if (action.lvl < 1) action.lvl = 1
    // new_state.buildings[action.from].lvl = action.lvl
    // new_state.production = calcBaseProduction(new_state.buildings)
    // new_state.productionOverDays = productionOverDays(new_state, new_state.productionOverDays.days)
    //
    // changeBuildingLvl(event, from)
    // {
    let lvl = event.target.value.match(/^[0-9]+$/)[0]
    if (lvl.length > 2) lvl = lvl.slice(-2) // last 2 numbers
    lvl = Number(lvl)
    if (lvl > 65) lvl = 65  //max lvl

    // }

    return {
        type: "CHANGE_BUILDING_LVL",
        from,
        lvl
    }
}

