/**
 * Created by Bombassd on 26.04.2017.
 */

const initState = {
    //selectedBuilding: {},
    lvl: 30,
    help: true      // Toggle for showing help everywhere or not
}

export function menu(state = initState, action) {
    switch (action.type) {
        case 'CHANGE_FRACTION':
            return {
                ...state,
                fraction: action.fraction
            }


        default:
            return state
    }
}