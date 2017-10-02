/**
 * Created by Bombassd on 27.04.2017.
 */
import {calcProduction} from './production'
//import { showBuildingMenu } from './menu'
//import {buildingKeys} from './../util/buildings'


export function keyInputBase(e,from, building)
{
    return (dispatch) => {
        const key = e.key
        console.log("KEY PRESSED: " + key)
        console.log({
            building
        })

    }

}


