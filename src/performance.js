/**
 * Created by Bombassd on 08.06.2017.
 */
import { futureProduction } from './production'

// c param how many buildings shoud be lvled for analieze
export function findBestToLvlUpNext(buildings, callback,  c = 3)
{
    let bestTibProd = [] //saves the building
    let maxProd = 0
    const length = buildings.length

    for(let i = 0; i < 20; i++){
        // LOGGING
        // if (i% 10 === 0)console.log(`run:  + ${i} + \t ${maxProd}`)

        // deep copy
        const copyBuildings = JSON.parse(JSON.stringify(buildings))

        // get random slots to test
        const randoms = []
        while(randoms.length < c)
        {
            const random = Math.floor(Math.random()*length)
            if (buildings[random].lvl && buildings[random].type !== "p") randoms.push(random)
        }

        // upgrade these random buildings
        randoms.map(slot => copyBuildings[slot].lvl += 1)

        // test if this randoms are bedder
        if(bestTibProd !== randoms) {
            const newFutureProd = futureProduction(copyBuildings)
            const tibProd = newFutureProd[119].prod.tib

            // if bedder results founded
            if (tibProd > maxProd) {
                maxProd = tibProd   // for compare with future results
                bestTibProd = randoms   //save best results - array of slots
                console.log(`New Best: run:  + ${i} + \t ${maxProd} \t ${bestTibProd}`)
                if(callback) callback(bestTibProd)
            }
        }
    }
    return bestTibProd;
}