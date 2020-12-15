import urlToBase from '../../util/parseurl';
import {
    BASE_CHANGE_DEFAULT_LVL,
    BUILDING_TYP_LVL_DOWN,
    BUILDING_TYP_LVL_UP,
    CHANGE_FRACTION,
    REPLACE_ALL_BASE,
    REPLACE_BASE_FROM_URL,
    REPLACE_SLOT,
    SWITCH_SLOT,
} from '../constants/actionTypes';

const buildingsReducer = (a, b) => (b.lvl && b.type !== 'y' ? a + 1 : a);
const countReducer = (a, b) => (b.lvl ? a + 1 : a);
const updateCounters = state => ({
    buildings: state.buildings.reduce(buildingsReducer, 0),
    army: state.army.reduce(countReducer, 0),
    defense: state.defense.reduce(countReducer, 0),
});

const initBase = urlToBase(
    // 'http://cncopt.com/?map=2|N|N|-fix-|.........12p12p12p.14r12h20s12h.12p24a12p12p16r12h27s12h.12p20p12p.14r12h20s12h.12p24a12p......12p12p12p.12n17s....cc.12n17s12nc..........j37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy'
    'http://cncopt.com/?map=2|N|N|-fix-|.........12p12p12p.14r12h20s12h.12p24a12p12p16r12h27s12h.12p20p12p.14r12h20s12h.12p24a12p......12p12p12p.12n17s....cc.12n17s12nc..........j37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy'
);

initBase.baseLvl = 15;
initBase.count = updateCounters(initBase);

export function base(state = initBase, action) {
    switch (action.type) {
        case REPLACE_SLOT:
            state = {
                ...state,
                [action.area]: state[action.area].map((b, i) =>
                    i === action.unit.slot ? { ...action.unit } : b
                ),
            };
            state.count = updateCounters(state);
            return state;
        case SWITCH_SLOT:
            state = {
                ...state,
                [action.area]: state[action.area].map((b, i) =>
                    i === action.from.slot ? action.from : i === action.to.slot ? action.to : b
                ),
            };
            state.count = updateCounters(state);
            return state;
        case REPLACE_ALL_BASE:
            return { ...state, ...action.base };
        case REPLACE_BASE_FROM_URL:
            state = { ...state, ...urlToBase(action.url) };
            state.count = updateCounters(state);
            return state;
        case CHANGE_FRACTION:
            return { ...state, faction: action.faction };
        case BUILDING_TYP_LVL_UP:
            return {
                ...state,
                buildings: state.buildings.map(b => {
                    if (b.type === action.buildingType) {
                        let { lvl } = b;
                        lvl += 1;
                        if (lvl > 65) lvl = 65;
                        return { ...b, lvl };
                    }
                    return b;
                }),
            };
        case BUILDING_TYP_LVL_DOWN:
            return {
                ...state,
                buildings: state.buildings.map(b => {
                    if (b.type === action.buildingType) {
                        let { lvl } = b;
                        lvl -= 1;
                        if (lvl < 12) lvl = 12;
                        return { ...b, lvl };
                    }
                    return b;
                }),
            };
        case BASE_CHANGE_DEFAULT_LVL:
            console.log('changeMenuLvl MENU_CHANGE_LVL');
            return { ...state, baseLvl: action.lvl };
        default:
            return state;
    }
}
