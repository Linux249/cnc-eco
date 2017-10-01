
import { copy } from './service'

// param buildings the base
// param times how many times each building up
// param type enum of "tib", "kris", "power", "credits"
const findBest = (buildings, times, type = "tib") => {
    buildings = copy(buildings)

    // check recursion deep
    if(times >= 0) {
        const timesCopy = times - 1
        // jedes gebäude einmal lvln
        buildings.forEach((building, i, buildings) => {
            const buildingsCopy = copy(buildings)

            try {
                console.log("wird der try block benötigt?")
                buildingsCopy[i].lvl += 1
                const production = production(buildingsCopy)
                const newBuildings = findBest(buildingsCopy, timesCopy, type )
                const newProduction = production(newBuildings)
                return newProduction[type] > production[type] ? newBuildings : buildingsCopy


            }catch (e) {
                console.log("ja")
                console.log(e.message)
                console.log({ building })
            }
        })
    }

}