/**
 * Created by Bombassd on 27.04.2017.
 */
import { calcBaseProduction, futureProduction } from '../util/production.js'

export function calcProduction() {

    return (dispatch, getState) => {
        const { buildings  }= getState()
        const production = calcBaseProduction(buildings)
        const futureProd = futureProduction(buildings, 120)
        return dispatch({
            type: 'CALC_PRODUCTION',
            production,
            futureProd
        })
    }
}