import urlToBase from '../../util/parseurl';
import {
    DEMO_REPLACE,
    DEMO_RESET_STATE,
    DEMO_SET_LOOT,
    DEMO_TOGGLE_UPGRADE,
} from '../constants/actionTypes';
import { calcBuildingCost, calcProduction } from '../../util/production';

const initial_buildings = [
    ...'..........tt.cc................t.t........t...c....t..cc..c.............',
].map((s, i) => {
    const slot = {
        slot: i,
    };
    if (s !== '.') slot.type = s;
    slot.costs = {
        t: 1,
        p: 0,
    };
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
        t: 10,
        k: 0,
        p: 10,
        c: 0,
    },
    upgrade: false,
};

export function demo(state = initState, action) {
    switch (action.type) {
        case DEMO_REPLACE:
            const { costs } = state.buildings[action.building.slot];
            // update buildings
            const buildings = [
                ...state.buildings.map(b =>
                    b.slot === action.building.slot ? action.building : b
                ),
            ];
            // calc new production
            const newP = calcProduction(buildings);
            const prod = { t: newP.tib, k: newP.kris, p: newP.power, c: newP.credits };
            // remove building costs from
            console.log({ costs, building: action.building });
            return {
                ...state,
                buildings,
                prod,
                loot: {
                    ...state.loot,
                    t: state.loot.t - costs.t,
                    p: state.loot.p - costs.p,
                },
            };
        case DEMO_RESET_STATE:
            return initial_buildings;
        case DEMO_SET_LOOT:
            return {
                ...state,
                loot: action.loot,
            };
        case DEMO_TOGGLE_UPGRADE:
            return {
                ...state,
                upgrade: !state.upgrade,
            };
        default:
            return state;
    }
}
