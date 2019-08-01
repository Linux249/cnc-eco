import urlToBase from '../../util/parseurl';
import { DEMO_REPLACE, DEMO_RESET } from '../constants/actionTypes';

const initial_buildings = urlToBase(
    'map=2|N|N|-fix-|...........t........t.t......t................c........c.c..............|newEconomy'
).buildings;

const initState = {
    buildings: initial_buildings,
    prod: {
        t: 0,
        k: 0,
        p: 0,
        c: 0,
    },
    loot: {
        t: 0,
        k: 0,
        p: 0,
        c: 0,
    },
};

export function demo(state = initState, action) {
    switch (action.type) {
        case DEMO_REPLACE:
            return {
                ...state,
                buildings: [
                    ...state.buildings.map(b =>
                        b.slot === action.building.slot ? action.building : b
                    ),
                ],
            };
        case DEMO_RESET:
            return {
                ...state,
                buildings: initial_buildings,
            }
        default:
            return state;
    }
}
