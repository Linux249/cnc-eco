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


export function getBest5Buildings(base) {
    console.time('getBest5Buildings')
    //  find buildings to measure
    const buildings = base.buildings.reduce((b, p) => {
        // power plants missing
        if(b.type && b.type in ['s', 'h', 'n', 'a', 'r']) p.push(b.slot)
    }, [])

    let bestBuildings = []
    let bestProd

    buildings.map(b1 => {
        buildings.map(b2 => {
            buildings.map(b3 => {
                buildings.map(b4 => {
                    buildings.map( b5 => {
                        base.buildings[b1].lvl += 1
                        base.buildings[b2].lvl += 1
                        base.buildings[b3].lvl += 1
                        base.buildings[b4].lvl += 1
                        base.buildings[b5].lvl += 1
                        // calc and compare production
                        const { prod } = futureProduction(base.buildings)[119];
                        if(bestProd < prod.tib) {
                            bestProd = prod.tib
                            bestBuildings = [b1, b2, b3, b4, b5]
                        } else if(bestProd === prod.tib) {
                            // todo measure first time for equal
                        }
                        base.buildings[b1].lvl -= 1
                        base.buildings[b2].lvl -= 1
                        base.buildings[b3].lvl -= 1
                        base.buildings[b4].lvl -= 1
                        base.buildings[b5].lvl -= 1

                    })
                })
            })
        })
    })

    console.timeEnd('getBest5Buildings')
    return bestBuildings
}
