/**
 * Created by Bombassd on 26.04.2017.
 */

const initState = {
    from: false,
    lvl: 30,
    fraction: "nod"
}

export function menu(state = initState, action) {
    switch (action.type) {
        case 'SHOW_BUILDING_MENU':
            return {
                ...state,
                from: action.from
            }
        case 'HIDE_BUILDING_MENU':
            return {
                ...state,
                from: false
            }
        case 'CHANGE_FRACTION':
            return {
                ...state,
                fraction: action.fraction
            }


        default:
            return state
    }
}