/**
 * Created by Bombassd on 12.01.2017.
 */
'use-strict'
const dummy = "http://cncopt.com/?map=2|N|N|-fix-|.........20p20p20p20p20p20h20s42h.20p20a20p20a20p20h20s20h.20p20p26p20p20p20h20s20h.20p20a20p20a20p....20p20p20p20p20n20s....cc.20n20s20nc..........j37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy"

//Url aufteilen

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
const raf_production_pp = [0, 72, 90, 110, 145, 190, 240, 290, 345, 410, 475, 555, 650, 812, 1015, 1269, 1586, 1983, 2479, 3099, 3874, 4842, 6053, 7566, 9458,
    11823, 14779, 18474, 23092, 28865, 36082, 45102, 56378, 70473, 88091, 110114, 137642, 172053, 215066, 268833,
    336042, 420052, 525065, 656332, 820415, 1025519, 1281898, 1602373, 2002967, 2503708, 3129636, 3912045, 4890056,
    6112570, 7640713, 9550891, 11938614, 14923268, 18654085, 23317606, 29147008, 36433760, 45542200, 56927750,
    71159687, 88949609];


const costs_tiberium =  [1, 2, 3, 4, 20, 110, 360, 1100, 3200, 8800, 22400, 48000, 63360, 83635, 110398, 145726, 192358, 253913, 335165, 442418, 583992, 770869, 1017547, 1343162, 1772974, 2340326,
    3089230, 4077783, 5382674, 7105130, 9378771, 12379978, 16341571, 21570873, 28473552, 37585089, 49612318, 65488260, 86444503, 114106743, 150620901, 198819590, 262441859, 346423253,
    457278694, 603607877, 796762397, 1051726364, 1388278801, 1832528017, 2418936983, 3192996817, 4214755798, 5563477654, 7343790503, 9693803464, 12795820573, 16890483156, 22295437766,
    29429977851, 38847570764, 51278793408, 67688007299, 89348169635, 117939583918];
const raf_cost = [2, 4, 6, 8, 40, 220, 720, 2200, 6400, 17600 ,44800, 96000, 126720, 167270, 220797, 291452, 384717, 507826,
    670330, 884836, 1167983, 1541738, 2035094, 2686324, 3545948, 4680651 ,6178459, 8155566, 10765348, 14210259,
    18757542, 24759955, 32683141, 43141746, 56947105, 75170179, 99224636, 130976519, 172889005, 228213487, 301241803, 397639180, 524883717, 692846507, 914557389, 1207215753, 1593524794, 2103452729, 2776557602, 3665056034, 4837873965, 6385993634, 8429511597, 11126955308, 14687581007, 19387606929, 25591641146, 33780966313, 44590875533, 58859955703, 77695141528, 102557586817, 135376014598, 178696339269, 235879167836];

const calcBaseUpCost = (buildings) => {
    let costs = {tib:0, power: 0}
    buildings.forEach(function(building){
        if(building.type  && building.lvl < 65) {
            switch(building.type)
            {
                case "n":       // kris harvester
                case "h":       // tib harvester
                    costs.tib += costs_tiberium[building.lvl]
                    costs.power += Math.round(costs_tiberium[building.lvl]/4*3 )    //power coosts for a harvester
                    break
                case "s":       // silo
                case "a":       // akku
                    costs.tib += costs_tiberium[building.lvl]
                    costs.power += Math.round(costs_tiberium[building.lvl]/4)
                    break
                case "r":       // rafenerieeee
                    costs.tib += costs_tiberium[building.lvl]*2 // dubble costs
                    costs.power += Math.round(costs_tiberium[building.lvl]/2)       //power costs for a raf
                    break
            }
        }

    })
    return costs
}

const calcBaseProduction = (buildings) => {
    let production = {
        tib: 0,
        kris: 0,
        power: 0,
        credits: 0
    }
    const neighbours = [-10, -9, -8, -1, 1, 8, 9, 10]


    buildings.forEach( function(building, i)
    {
        // exist building
        if(building) {
            //console.log(building.lvl)
            // get tib/kris Silo?
            if (building.type === "s")
            {
                neighbours.forEach(function(n)
                {
                    const j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        if (buildings[j] && buildings[j].type === "h")     // h = tib
                        {
                            production.tib += silo_production[building.lvl]       // 0 = tib
                        } else if (buildings[j] && buildings[j].type === "n")     //n = kris
                        {
                            production.kris += silo_production[building.lvl]      // 1 = kris
                        }

                    }
                })
            }
            // get power from akku
            else if (building.type === "a")
            {
                neighbours.forEach(function(n)
                {
                    const j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        if (buildings[j] && buildings[j].type === "p")     // p = PowerPlant
                        {
                            production.power += accu_production[building.lvl]       // 2 = power
                        }


                    }
                })
            }
            // get tib/kris harvester Production
            else if (building.type === "h") production.tib += harvest_production_packet[building.lvl]   // tib harvest
            else if (building.type === "n") production.kris += harvest_production_packet[building.lvl]  // kris harvest
            // TODO powerplant produktion

            //get credits from Rafs
            else if (building.type === "r")
            {
                // ground credit production
                production.credits += raf_production_perm[building.lvl]
                //count harvester/tib's
                neighbours.forEach(function(n)
                {
                    const j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        // find harvest/tib
                        if (buildings[j] && ( buildings[j].type === "t" || buildings[j].type === "h"))
                        {
                            production.credits = production.credits + raf_production_perm[building.lvl]/2 // production[3] = credis
                        }
                        //TODO find powerPlants

                    }
                })
            }
        }
    })
    //console.log(production)
    return production
}


const urlToBase = (url = dummy) => {
    const split = url.split("|")
    const baseName = split[3]
    const faction = split[1] // F = forgetten, N = NOD, G = GDI
    let urlString = split[4]
    let slot = 1;
    let building, unit, lvl;

    const base = {
        nod_buildings_keys: {
            "r": "NOD_Refinery",
            "p": "NOD_Power Plant",
            "h": "NOD_Harvester",
            "y": "NOD_Construction Yard",
            "d": "NOD_Airport",
            "q": "NOD_Defense HQ",
            "b": "NOD_Barracks",
            "s": "NOD_Silo",
            "f": "NOD_Factory",
            "n": "NOD_Harvester_Crystal",
            "e": "NOD_Command Post",
            "z": "NOD_Support_Art",
            "i": "NOD_Support_Ion",
            "a": "NOD_Accumulator",
            "x": "NOD_Support_Air",
            "w": "NOD_Defense Facility",
            "t": "tiberium",
            "c": "crystal"
        },
        buildings: [],
        defens: [],
        army: [],
        faction: faction,
        name: baseName
    };

    //Gebäude auslesen - 72 slots
    while (slot <= 72) {
        building,
            lvl = false;
        if (urlString[0] == ".") {
            urlString = urlString.slice(1);
            base.buildings.push({});
        } else {
            if (!isNaN(urlString[0])) {
                let num = urlString[0];
                urlString = urlString.slice(1);
                if (!isNaN(urlString[0])) {
                    num += urlString[0];
                    urlString = urlString.slice(1);
                }
                lvl = +num;
            }
            building = urlString[0];
            urlString = urlString.slice(1);
            base.buildings.push({
                name: base.nod_buildings_keys[building],
                type: building,
                lvl: lvl,
                slot: slot,
                x: slot % 9,
                y: Math.ceil(slot / 9)
            });

        }
        slot++;
    }

    //Armee defens - 72 slots
    slot = 1; //reset
    while (slot <= 72) {
        unit,
            lvl = false;
        if (urlString[0] == ".") {
            urlString = urlString.slice(1);
            base.defens.push({});
        } else {
            if (!isNaN(urlString[0])) {
                let num = urlString[0];
                urlString = urlString.slice(1);
                if (!isNaN(urlString[0])) {
                    num += urlString[0];
                    urlString = urlString.slice(1);
                }
                lvl = +num;
            }
            unit = urlString[0];
            urlString = urlString.slice(1);
            base.defens.push({
                type: unit,
                lvl: lvl,
                slot: slot,
                x: slot % 9,
                y: Math.ceil(slot / 9)
            });
        }
        slot++;
    }

    //unit army - 36 slots
    slot = 1; //reset
    while (slot <= 36) {
        unit,
            lvl = false;
        if (urlString[0] == ".") {
            urlString = urlString.slice(1);
            base.army.push({});
        } else {
            if (!isNaN(urlString[0])) {
                let num = urlString[0];
                urlString = urlString.slice(1);
                if (!isNaN(urlString[0])) {
                    num += urlString[0];
                    urlString = urlString.slice(1);
                }
                lvl = +num;
            }
            unit = urlString[0];
            urlString = urlString.slice(1);
            base.army.push({
                type: unit,
                lvl: lvl,
                slot: slot,
                x: slot % 9,
                y: Math.ceil(slot / 9)
            });
        }
        slot++;
    }

    delete(base.nod_buildings_keys);

    //@return base
    return base;
}


const parseBaseToURL = (base) => {
    let urlString = "";
    base.buildings.concat(base.defens, base.army).forEach(function(building) {
        if (building.type) {
            if (building.lvl) {
                urlString += building.lvl;
            }
            urlString += building.type;
        } else {
            urlString += ".";
        }
    })
    return urlString
}


// lvl all buildings += [lvl]
const allBuildingLvLUp = (base, lvl = 0) => {
    if(base.buildings) {
        base.buildings.forEach(function(building){
            if (building.lvl){
                building.lvl += lvl     //upgrade building lvl
                if (building.lvl > 65) building.lvl = 65        // check for max lvl (65)
            }

        })
    }
    return base
}

const best = (base) => {
    let topTib = []
    base.buildings.forEach((building, index, allBuildings) => {
        // upgrade one building
        if(building.lvl < 65) {
            building.lvl += 1
            let production = calcBaseProduction(allBuildings)
           // console.log(building)
            console.info(production)
            topTib.push(production)
        }

        //console.log(building)
    })

   return topTib
}

const productionOverDays = (base, days) => {
    let prodOverTime = []
    let limit = days*24
    let time = 0
    while(time < limit) {
        let production = calcBaseProduction(base.buildings)
        let costs = calcBaseUpCost(base.buildings)
        prodOverTime.push({
            production,
            time
        })
        base = allBuildingLvLUp(base, 1)
        console.log(production.tib)
        time = time + costs.tib/production.tib
        console.log(time)
    }

    return prodOverTime

}

exports.allBuildingLvLUp = allBuildingLvLUp
exports.best = best
exports.parseBaseToURL = parseBaseToURL
exports.urlToBase = urlToBase
exports.productionOverDays = productionOverDays


exports.calcBaseProduction = calcBaseProduction
exports.calcBaseUpCost = calcBaseUpCost

// TEST
//let base = urlToBase(dummy);
//let urlString = parseToURL(base);
//let out = "http://cncopt.com/?map=2|N|N|-fix-|" + urlString + "|newEconomy";
//console.log(urlString);
//console.log((out.localeCompare(dummy)));
//console.log(dummy);


