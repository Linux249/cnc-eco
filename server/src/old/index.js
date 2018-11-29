/**
 * Created by Bombassd on 12.01.2017.
 */

'use-strict';

const parseurl = require('../parseurl.js');
const production = require('../production');

const dummy =
    'http://cncopt.com/?map=2|N|N|-fix-|.........12p12p12p.14r12h20s12h.12p24a12p12p16r12h27s12h.12p20p12p.14r12h20s12h.12p24a12p......12p12p12p.12n17s....cc.12n17s12nc..........j37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy';

let base = parseurl.urlToBase(dummy);

console.log('URL');
console.log(dummy);

let product = production.calcBaseProduction(base.buildings);
console.log('Produktion');
console.log(product);

console.log('Upgrade all buildings 11');
base = parseurl.allBuildingLvLUp(base, 11);
product = production.calcBaseProduction(base.buildings);
console.log(product);

console.log('Costs');
const cost = parseurl.calcBaseUpCost(base.buildings);
console.log(cost);

const test = [{ a: 0 }, { a: 0 }, { a: 0 }];

test.forEach(b => {
    b.a += 1;
    console.log(b.a);
    console.log(test);
});

const pre = 'http://cncopt.com/?map=2|N|N|-fix-|';
const url = `${pre + parseurl.parseBaseToURL(base)}|newEconomy`;
console.log(url);

console.log('TEst best');
const best = parseurl.best(base);
// console.log(best)

base = parseurl.urlToBase(dummy);
console.log('TEST productionOverDays');
const chartData = parseurl.productionOverDays(base, 90);
console.log(chartData);
// console.log(base.buildings)
