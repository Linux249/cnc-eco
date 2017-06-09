/**
 * Created by Bombassd on 08.06.2017.
 */
'use strict'
import { futureProduction } from './production'
import async from 'async'



// c param how many buildings shoud be lvled for analieze
export function findBestToLvlUpNext(buildings, callback,  c = 3)
{

    let bestTibProd = [] //saves the building
    let maxProd = 0
    const length = buildings.length

    let  i = 0
    const end = 100
    const candidates = []

    for(let x = 0; x <= 100; x++) {
        // get random slots to test
        const randoms = []

        while(randoms.length < c)
        {
            const random = Math.floor(Math.random()*length)
            if (buildings[random].lvl && buildings[random].type !== "p") randoms.push(random)
        }
        candidates.push(randoms)
    }

    async.filter( candidates , (randoms, call) => {

            // test if this randoms aren't allready founded
            if(bestTibProd !== randoms) {
                // deep copy
                const copyBuildings = JSON.parse(JSON.stringify(buildings))

                // upgrade these random buildings
                randoms.map(slot => copyBuildings[slot].lvl += 1)

                const newFutureProd = futureProduction(copyBuildings)
                const tibProd = newFutureProd[119].prod.tib

                // if bedder results founded
                if (tibProd > maxProd) {
                    maxProd = tibProd   // for compare with future results
                    bestTibProd = randoms   //save best results - array of slots
                    console.log(`New Best: run:  + ${i} + \t ${maxProd} \t ${bestTibProd}`)
                    // if(callback) {
                    //     // async.setImmediate(() =>
                    //     callback(bestTibProd)
                    //     // setTimeout(() => console.log("timeout"), 1000)
                    // }
                    call(null, true,callback(bestTibProd))
                } else call(null, false)
            } else call(null, false)
            // i++;
            // next();

        },
        (err, res) =>  {
            console.log(res)
        });

    // for(let i = 0; i < 200; i++){
    // }
    return bestTibProd;
}


export function findBestNext(buildings)
{
    'use strict'

}