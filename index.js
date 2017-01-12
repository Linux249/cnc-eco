/**
 * Created by Bombassd on 12.01.2017.
 */
'use-strict'
var parseurl = require('./src/parseurl.js')
const dummy = "http://cncopt.com/?map=2|N|N|-fix-|tc20h20n.50e...26p26p26p26p26p42h47s42h.26p52a26p52a26p42h54s42h.26p26p26p26p26p42h46s42h.26p52a26p50a31p40b...31p35p35p38pc.....cc.c.cc.43f.46d..37q..20sj37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy"

var base = parseurl.urlToBase()

console.log("URL")
console.log(dummy)




var product = parseurl.calcBaseProduction(base.buildings)
console.log("Produktion")
console.log(product)


console.log("Upgrade all buildings 11")
base = parseurl.allBuildingLvLUp(base, 11)
product = parseurl.calcBaseProduction(base.buildings)
console.log(product)

console.log("Costs")
var cost = parseurl.calcBaseUpCost(base.buildings)
console.log(cost)

var test =  [{a:0},{a:0},{a:0}]

const log = () =>  console.log(test)

test.forEach(b =>  {
    b.a += 1
    console.log(b.a)
    console.log(test)
})
log()


var prä = "http://cncopt.com/?map=2|N|N|-fix-|"
var url = prä + parseurl.parseBaseToURL(base) + "|newEconomy"
console.log(url)


console.log("TEst best")
var best = parseurl.best(base)
console.log(best)
