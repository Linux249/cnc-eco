import urlToBase from '../../util/parseurl';
import {
    DEMO_REPLACE,
    DEMO_RESET,
    DEMO_SET_LOOT,
    DEMO_TOGGLE_UPGRADE,
} from '../constants/actionTypes';
import { calcProduction } from '../../util/production';

const initial_buildings = [
    ...'..........tt.cc................t.t........t...c....t..cc..c.............',
].map((s, i) => {
    const slot = {
        slot: i,
    };
    if (s !== '.') slot.type = s;
    return slot;
});

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
    upgrade: false,
};

export function demo(state = initState, action) {
    switch (action.type) {
        case DEMO_REPLACE:
            const buildings = [
                ...state.buildings.map(b =>
                    b.slot === action.building.slot ? action.building : b
                ),
            ];
            const newP = calcProduction(buildings);
            const prod = { t: newP.tib, k: newP.kris, p: newP.power, c: newP.credits };
            return {
                ...state,
                buildings,
                prod,
            };
        case DEMO_RESET:
            return {
                ...state,
                buildings: initial_buildings,
            };
        // case DEMO_SET_LOOT:
        //     return {
        //         ...state,
        //         loot: action.loot,
        //     };
        case DEMO_TOGGLE_UPGRADE:
            return {
                ...state,
                upgrade: !state.upgrade,
            };
        default:
            return state;
    }
}
