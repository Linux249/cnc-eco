/**
 * Created by Bombassd on 03.01.2017.
 */


/*
    calc the produktion from Base
 */



export  function calcBaseProduction(buildings)
{
    let production = [0,0,0,0]      // [tib, kris, power, credits]
    const neighbours = [-10, -9, -8, -1, 1, 8, 9, 10]
    const silo_production = [0,72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710, 887, 1109, 1386, 1733, 2166, 2708, 3385, 4231, 5289, 6612, 8265, 10331,
        12914, 16143, 20179, 25224, 31530, 39412, 49266, 61582, 76978, 96222, 120278, 150348, 187935, 234919, 293649,
        367061, 458826, 573533, 716916, 896145, 1120182, 1400228, 1750285, 2187856, 2734820, 3418525, 4273157, 5341446,
        6676807, 8346009, 10432512, 13040640, 16300800, 20376000, 25470000, 31837501, 39796876, 49746095, 62182619,
        77728274, 97160342];  //Stufe 12 Silo Produziert array[12] tiberium * Anzahl der Sammler
    const accu_production = [ 0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465, 581, 726, 908, 1135, 1419, 1773, 2217, 2771, 3464, 4330, 5413, 6766, 8458,
        10572, 13216, 16520, 20650, 25812, 32265, 40332, 50415, 63019, 78774, 98467, 123084, 153855, 192319, 240399, 300499,
        375624, 469530, 586912, 733640, 917050, 1146313, 1432891, 1791114, 2238893, 2798616, 3498271, 4372838, 5466048,
        6832560, 8540701, 10675876, 13344845, 16681056, 20851321, 26064151, 32580189, 40725236, 50906545, 63633182];
    const harvest_production_packet = [0, 40, 300, 432, 570, 735, 920, 1120, 1330, 1560, 1800, 2050, 2360, 2950, 3687, 4609, 5761, 7202, 9002, 11253, 14066, 17583,
        21979, 27474, 34342, 42928, 53660, 67075, 83844, 104805, 131006, 163757, 204697, 255871, 319839, 399799, 499749,
        624686, 780858, 976073, 1220091, 1525114, 1906392, 2382991, 2978738, 3723423, 4654279, 5817849, 7272311,
        9090389, 11362986, 14203733, 17754666, 22193333, 27741666, 34677083, 43346354, 54182942, 67728678, 84660848,
        105826060, 132282575, 165353218, 206691523, 258364404, 322955505]
    const raf_production_perm = [0, 120, 150, 180, 240, 315, 400, 485, 575, 680, 790, 924, 1080, 1350, 1687, 2109, 2636, 3295, 4119, 5149, 6437, 8046, 10058, 12572, 15716, 19645, 24556, 30695, 38369, 47961, 59952, 74940, 93675, 117093, 146367, 182959, 228698, 285873, 357342,
        446677, 558346, 697933, 872417, 1090521, 1363151, 1703939, 2129924, 2662405, 3328006, 4160008, 5200010,
        6500013, 8125016, 10156271, 12695338, 15869173, 19836467, 24795583, 30994479, 38743099, 48428874, 60536093,
        75670117, 94587646, 118234557, 147793197 ]

    buildings.forEach((building, i) =>
    {
        // exist building
        if(building) {
            // get tib/kris Silo?
            if (building.type === "s")
            {
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                         if (buildings[j] && buildings[j].type === "h")     // h = tib
                        {
                            production[0] += silo_production[building.lvl]       // 0 = tib
                        } else if (buildings[j] && buildings[j].type === "n")     //n = kris
                        {
                            production[1] += silo_production[building.lvl]      // 1 = kris
                        }

                    }
                })
            }
            // get power from akku
            else if (building.type === "a")
            {
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        if (buildings[j] && buildings[j].type === "p")     // p = PowerPlant
                        {
                            production[2] += accu_production[building.lvl]       // 2 = power
                        }


                    }
                })
            }
            // get tib/kris harvester Production
            else if (building.type === "h") production[0] += harvest_production_packet[building.lvl]
            else if (building.type === "n") production[1] += harvest_production_packet[building.lvl]
            // TODO powerplant produktion

            //get credits from Rafs
            else if (building.type === "r")
            {
                // ground credit production
                production[3] += raf_production_perm[building.lvl]
                //count harvester/tib's
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        // find harvest/tib
                        if (buildings[j] && ( buildings[j].type === "t" || buildings[j].type === "h"))
                        {
                            production[3] = production[3] + raf_production_perm[building.lvl]/2 // production[3] = credis
                        }
                        //TODO find powerPlants

                    }
                })
            }
        }
    })
    //console.log(production)
    return {
        tib: production[0],
        kris: production[1],
        power: production[2],
        credits: production[3],
    }

}
