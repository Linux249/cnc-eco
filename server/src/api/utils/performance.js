/**
 * Created by Bombassd on 08.06.2017.
 */

import { futureProduction } from './production';
// import async from 'async'

// c param how many buildings shoud be lvled for analieze
export function findBestToLvlUpNext(buildings, callback) {
    const bestTibProd = []; // saves the building
    const maxProd = 0;
    const finish = false;

    const i = 0;
    const end = 100;
    const candidates = [];

    const it = gen(buildings, callback);
    const interval = setInterval(doStuf, 100);
    function doStuf() {
        const res = it.next();
        callback(res.value);
        if (res.done) clearInterval(interval);
    }

    //
    // async.filter( candidates , (randoms, call) => {
    //
    //         // test if this randoms aren't allready founded
    //         if(bestTibProd !== randoms) {
    //             // deep copy
    //
    //
    //             // upgrade these random buildings
    //
    //             const copyBuildings= getUpgradedBase(buildings, randoms)
    //             const newFutureProd = futureProduction(copyBuildings)
    //             const tibProd = newFutureProd[119].prod.tib
    //
    //             // if bedder results founded
    //             if (tibProd > maxProd) {
    //                 maxProd = tibProd   // for compare with future results
    //                 bestTibProd = randoms   //save best results - array of slots
    //                 console.log(`New Best: run:  + ${i} + \t ${maxProd} \t ${bestTibProd}`)
    //                 // if(callback) {
    //                 //     // async.setImmediate(() =>
    //                 //     callback(bestTibProd)
    //                 //     // setTimeout(() => console.log("timeout"), 1000)
    //                 // }
    //                 callback(bestTibProd, call)
    //             } else call(null, false)
    //         } else call(null, false)
    //         // i++;
    //         // next();
    //
    //     },
    //     (err, res) =>  {
    //         console.log(res)
    //     });

    // for(let i = 0; i < 200; i++){
    // }
    return 'ret';
}

function* gen(buildings) {
    // const building = buildings
    let maxProd = 0;
    let bestTibProd = [];
    let i = 0;
    const end = 1000;
    while (i < end) {
        const randoms = getRandomBuildings(buildings);
        const copyBuildings = getDowngradeBase(buildings, randoms);
        const tibProd = futureProduction(copyBuildings)[119].prod.tib;

        // if bedder results founded
        if (tibProd >= maxProd) {
            maxProd = tibProd; // for compare with future results
            bestTibProd = randoms; // save best results - array of slots
            console.log(`New Best: run:  + ${i} + \t ${maxProd} \t ${bestTibProd}`);
            yield bestTibProd;
        }

        i++;
    }
}

function getRandomBuildings(buildings) {
    const length = buildings.length;
    const randoms = [];

    while (randoms.length < 10) {
        const random = Math.floor(Math.random() * length);
        if (buildings[random].type && 'shnra'.indexOf(buildings[random].type) !== -1) {
            randoms.push(random);
        }
    }
    return randoms;
}

// upgrade bases given the slots in randoms (they are all broved buidlings)
function getUpgradedBase(buildings, randoms) {
    const copyBuildings = JSON.parse(JSON.stringify(buildings));
    randoms.map(slot => (copyBuildings[slot].lvl += 1));
    return copyBuildings;
}

// upgrade bases given the slots in randoms (they are all broved buidlings)
function getDowngradeBase(buildings, randoms) {
    const copyBuildings = JSON.parse(JSON.stringify(buildings));
    randoms.map(slot => (copyBuildings[slot].lvl -= 1));
    return copyBuildings;
}

// get $count buildings upgraded
function getRandomLvlUpBase(buildings, count) {
    const copyBuildings = JSON.parse(JSON.stringify(buildings));
    const length = buildings.length;

    let i = 0;
    while (i < count) {
        const random = Math.floor(Math.random() * length);
        // TODO add p
        if (copyBuildings[random].type && copyBuildings[random].type in ['s', 'h', 'n', 'a', 'r']) {
            randoms.push(random);
            i++;
        }
    }
}

// todo too mutch time, 2 are 6s, 3 are 120s, 4...
export function getBest5Buildings(base) {
    console.time('getBest5Buildings');
    //  find buildings to measure
    const buildings = base.buildings.reduce((a, b) => {
        if (b.type && ['s', 'h', 'n', 'a', 'r'].includes(b.type)) a.push(b.slot);
        return a;
    }, []);

    let bestBuildings = [];
    let bestProd = 0;
    console.log(buildings, buildings.length);

    buildings.map(b1 => {
        buildings.map(b2 => {
            buildings.map(b3 => {
                //     buildings.map(b4 => {
                //         buildings.map( b5 => {
                base.buildings[b1].lvl += 1;
                base.buildings[b2].lvl += 1;
                base.buildings[b3].lvl += 1;
                // base.buildings[b4].lvl += 1
                // base.buildings[b5].lvl += 1
                // calc and compare production
                const { prod } = futureProduction(base.buildings)[119];
                if (bestProd < prod.tib) {
                    bestProd = prod.tib;
                    bestBuildings = [b1, b2, b3]; //, b4, b5]
                    console.log(bestBuildings, prod);
                } else if (bestProd === prod.tib) {
                    // todo measure first time for equal
                }
                base.buildings[b1].lvl -= 1;
                base.buildings[b2].lvl -= 1;
                base.buildings[b3].lvl -= 1;
                //             base.buildings[b4].lvl -= 1
                //             base.buildings[b5].lvl -= 1
                //
                //         })
                //     })
            });
        });
    });

    console.timeEnd('getBest5Buildings');
    return bestBuildings;
}

export function easyLvLUp(base, count = 10) {
    console.time('easyLvLUp');
    //  find buildings to measure
    const buildings = base.buildings.reduce((a, b) => {
        if (b.type && ['s', 'h', 'n', 'a', 'r'].includes(b.type)) a.push(b.slot);
        return a;
    }, []);

    const bestBuildings = [];

    for (let c = 1; c <= count; c += 1) {
        let best = {},
            max = 0;
        buildings.forEach(b => {
            // const cost = calcBuildingCost(base.buildings[b])
            // const prod = calcBaseProduction(base.buildings)
            // const powerTime = cost.power / prod.power
            // const tibTime = cost.tib / prod.tib
            // const time  = powerTime > tibTime ? powerTime : tibTime

            // eignetlich ist der maximalwert scheiße da die zeit in der er berechnet wude minimal ist,
            base.buildings[b].lvl += 1;
            const { tib } = futureProduction(base.buildings, b)[119].prod;
            base.buildings[b].lvl -= 1;
            if (max < tib) {
                max = tib;
                best = b;
            }
        });
        // console.log(best, max)
        bestBuildings.push(best);
        base.buildings[best].lvl += 1;
    }
    console.timeEnd('easyLvLUp');
    console.log({ bestBuildings });
    return bestBuildings;
}
