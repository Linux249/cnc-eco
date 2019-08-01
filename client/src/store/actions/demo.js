import { DEMO_REPLACE, DEMO_RESET } from '../constants/actionTypes';

export const replace = building => {
    return {
        type: DEMO_REPLACE,
        building: { ...building },
    };
};

export const reset = () => ({type: DEMO_RESET})
