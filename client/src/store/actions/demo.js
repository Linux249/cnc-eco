import {
    DEMO_REPLACE,
    DEMO_RESET_STATE,
    DEMO_SET_LOOT,
    // DEMO_SET_PROD,
    DEMO_SET_UPGRADE,
} from '../constants/actionTypes';
import { calcBuildingCost } from '../../util/production';

export const replace = building => {
    building.costs = calcBuildingCost(building);
    return {
        type: DEMO_REPLACE,
        building: { ...building },
    };
};

export const reset = () => ({ type: DEMO_RESET_STATE });

export const setLoot = loot => ({
    type: DEMO_SET_LOOT,
    loot,
});

// export const setProd = prod => ({
//     type: DEMO_SET_PROD,
//     prod
// })

export const setUpgrade = upgrade => ({ type: DEMO_SET_UPGRADE, upgrade });
