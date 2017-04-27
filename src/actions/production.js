/**
 * Created by Bombassd on 27.04.2017.
 */
import { calcBaseProduction, productionOverDays } from '../util/production.js'

export function calcProduction() {

    return (dispatch, getState) => {
        const { buildings  }= getState()
        const production = calcBaseProduction(buildings)
        return dispatch({
            type: 'CALC_PRODUCTION',
            production
        })
    }


}