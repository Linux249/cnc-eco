/**
 * Created by Bombassd on 26.04.2017.
 */

const initState = {
    showMenu: false
}

export function menu(state = initState, action) {
    switch (action.type) {
        case 'TOGGLE_BUILDING_MENU':
            return {
                ...state,
                showMenu: !state.showMenu
            }

        default:
            return state
    }
}