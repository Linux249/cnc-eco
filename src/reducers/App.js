/**
 * Created by Bombassd on 24.02.2017.
 */
import { reducerCall } from './index';

import { urlToBase } from './../util/parseurl.js'
import { calcBaseProduction, productionOverDays } from '../util/production.js'


/**
 * Reducer static class
 */
class reducerClass
{
    /**
     * Show the delete prompt
     *
     * @param new_state
     * @param action
     * @returns {*}
     */
/*
    static buildingMenuShow(new_state, action)
    {
        new_state.buildingMenu.show = true
        new_state.buildingMenu.from = action.from ? action.from : new_state.buildingMenu.from
        return new_state;

    }
 */
}

/**
 * Users reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function app(state = initial_state, action) {
    /*    console.log("****STATE****")
     console.log(state)*/
    return reducerCall(state, action, reducerClass);
}

