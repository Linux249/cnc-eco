import {
    DEMO_REPLACE,
    DEMO_RESET_STATE,
    DEMO_SET_LOOT,
    DEMO_SET_UPGRADE,
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
    upgrade: 1,
};

export function demo(state = initState, action) {
    switch (action.type) {
        case DEMO_REPLACE:
            const { building } = action;
            const { slot } = action.building;
            let { t, p } = state.buildings[slot].costs;
            // update buildings

            // calc the missing costs for the other buildings
            for (let i = 1; i < state.upgrade; i++) {
                building.lvl += 1;
                building.cost = calcBuildingCost(building);
                t += building.cost.t;
                p += building.cost.p;
            }
            const buildings = [
                ...state.buildings.map(b => (b.slot === slot ? action.building : b)),
            ];
            // calc new production
            const newP = calcProduction(buildings);
            const prod = { t: newP.tib, k: newP.kris, p: newP.power, c: newP.credits };
            // remove building costs from
            console.log({ t, p, building: action.building });
            return {
                ...state,
                buildings,
                prod,
                loot: {
                    ...state.loot,
                    t: state.loot.t - t,
                    p: state.loot.p - p,
                },
            };
        case DEMO_RESET_STATE:
            return initial_buildings;
        case DEMO_SET_LOOT:
            return {
                ...state,
                loot: action.loot,
            };
        case DEMO_SET_UPGRADE:
            return {
                ...state,
                upgrade: action.upgrade,
            };
        default:
            return state;
    }
}
