import { MENU_SET_SHIFT_PRESSED } from '../constants/actionTypes';

const initState = {
    //selectedBuilding: {},
    // lvl: 22,
    help: true, // Toggle for showing help everywhere or not
    shift: false, // show if shift is pressed
};

export function menu(state = initState, action) {
    switch (action.type) {
        case MENU_SET_SHIFT_PRESSED:
            return {
                ...state,
                shift: action.shift
            }
        default:
            return state;
    }
}
