

//Url aufteilen
function urlToBase(url)
{
    // Todo doku wie der string aussehen sollte
    // Todo was passiert wen string anders aussieht?
    let split = url.split("|")
    let baseName = split[3]
    let faction = split[1] // F = forgetten, N = NOD, G = GDI
    let urlString = split[4]
    let slot = 1
    let building, unit, lvl

    let base = {
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
    }

    //Gebäude auslesen - 72 slots
    while (slot <= 72)
    {
        //building,
        lvl = false
        if (urlString[0] === ".")
        {
            urlString = urlString.slice(1)
            base.buildings.push({})
        } else {
            if (!isNaN(urlString[0]))
            {
                let num = urlString[0]
                urlString = urlString.slice(1)
                if (!isNaN(urlString[0]))
                {
                    num += urlString[0]
                    urlString = urlString.slice(1)
                }
                lvl = +num
            }
            building = urlString[0]
            urlString = urlString.slice(1)
            base.buildings.push({
                name: base.nod_buildings_keys[building],
                type: building,
                lvl: lvl,
                slot: slot,
                x: slot % 9,
                y: Math.ceil(slot / 9)
            })
        }
        slot++
    }

    //Armee defens - 72 slots
    slot = 1 //reset
    while (slot <= 72)
    {
        unit = false
        lvl = false
        if (urlString[0] === ".")
        {
            urlString = urlString.slice(1)
            base.defens.push({})
        } else {
            if (!isNaN(urlString[0]))
            {
                let num = urlString[0]
                urlString = urlString.slice(1)
                if (!isNaN(urlString[0]))
                {
                    num += urlString[0]
                    urlString = urlString.slice(1)
                }
                lvl = +num
            }
            unit = urlString[0]
            urlString = urlString.slice(1)
            base.defens.push({
                type: unit,
                lvl: lvl,
                slot: slot,
                x: slot % 9,
                y: Math.ceil(slot / 9)
            })
        }
        slot++
    }

  //unit army - 36 slots
    slot = 1 //reset
    while (slot <= 36)
    {
        unit = false
        lvl = false
        if (urlString[0] === ".")
        {
            urlString = urlString.slice(1)
            base.army.push({})
        } else {
            if (!isNaN(urlString[0])) {
                let num = urlString[0]
                urlString = urlString.slice(1)
                if (!isNaN(urlString[0])) {

                    num += urlString[0]
                    urlString = urlString.slice(1)
                }
                lvl = +num
            }
            unit = urlString[0]
            urlString = urlString.slice(1)
            base.army.push({
                type: unit,
                lvl: lvl,
                slot: slot,
                x: slot % 9,
                y: Math.ceil(slot / 9)
            })
        }
    slot++
    }

    delete(base.nod_buildings_keys)

    //@return base
    return base
}


function parseToURL(base)
{
    let urlString = ""
    for (let building of base.buildings.concat(base.defens, base.army))
    {
        if (building.type)
        {
            if (building.lvl)
            {
                urlString += building.lvl
            }
            urlString += building.type
        } else {
            urlString += "."
        }
  }
  return urlString
}

//return
const dumy = "http://cncopt.com/?map=2|N|N|-fix-|tc20h20n.50e...26p26p26p26p26p42h47s42h.26p52a26p52a26p42h54s42h.26p26p26p26p26p42h46s42h.26p52a26p50a31p40b...31p35p35p38pc.....cc.c.cc.43f.46d..37q..20sj37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy"

let base = urlToBase(dumy)
let urlString = parseToURL(base)
let out = "http://cncopt.com/?map=2|N|N|-fix-|" + urlString + "|newEconomy"

console.log(urlString)
console.log((out.localeCompare(dumy)))
console.log(dumy)


console.log(base)

export { urlToBase }