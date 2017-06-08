/**
 * Created by Bombassd on 08.06.2017.
 */
import { futureProduction } from './production'

// c param how many buildings shoud be lvled for analieze
export function findBestToLvlUpNext(buildings, c = 10)
{

    let bestTibProd = [] //saves the building
    let maxProd = 0
    const length = buildings.length
    const prevFutureProd = futureProduction(buildings)


    for(let i = 0; i < 150; i++){
        if (i% 10 === 0)console.log(`run:  + ${i} + \t ${maxProd}`)
        // console.log(i)
        // deep copy
        const copyBuildings = JSON.parse(JSON.stringify(buildings))

        // get random slots to test
        const randoms = []
        while(randoms.length <= c)
        {
            const random = Math.floor(Math.random()*length)
            if (buildings[random].lvl) randoms.push(random)
        }

        // upgrade these random buildings
        // console.log(randoms)
        randoms.map(slot => copyBuildings[slot].lvl += 1)
        // const random = Math.floor(Math.random()*length)
        // const building = copyBuildings[random]

        // console.log("Random: "+ random)
        // console.log(building)

        // test if this randoms are bedder
        if(bestTibProd !== randoms) {
           // building.lvl += 1
            const newFutureProd = futureProduction(copyBuildings)
            const tibProd = newFutureProd[119].prod.tib
            if (tibProd > maxProd) {
                // console.log("new best found")
                maxProd = tibProd
                // console.log("vorher: " + prevFutureProd[119].prod.tib)
                // console.log("nacher: " + newFutureProd[119].prod.tib)
                bestTibProd = randoms
                // console.log(newFutureProd[119].prod.tib - prevFutureProd[119].prod.tib)
                // console.log(bestTibProd)
                // console.log(copyBuildings[bestTibProd])

            }
        }
        // console.log({prevFutureProd, random, building, newFutureProd})
    }


    return bestTibProd;


    // return bestTibProd

}