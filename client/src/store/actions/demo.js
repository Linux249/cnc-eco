import {
    DEMO_REPLACE,
    DEMO_RESET,
    DEMO_SET_LOOT,
    DEMO_SET_PROD,
    DEMO_TOGGLE_UPGRADE,
} from '../constants/actionTypes';

export const replace = building => {
    return {
        type: DEMO_REPLACE,
        building: { ...building },
    };
};

export const reset = () => ({type: DEMO_RESET})

export const setLoot = loot => ({
    type: DEMO_SET_LOOT,
    loot
})

// export const setProd = prod => ({
//     type: DEMO_SET_PROD,
//     prod
// })


export const toogleUpgrade = () => ({type: DEMO_TOGGLE_UPGRADE})
