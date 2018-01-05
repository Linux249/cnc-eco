'use strict'
import { layoutStats } from '../../utils/layout'
import { Router } from "express"
const router = Router()


// GET /api/v1/layout
// get a single labtop with world + coords as params
router.get("/layout", (req, res, next) => {
    const { w, x,y } = req.query
    // TODO auth require

    const collection = req.db.collection(`layouts_${w}`)
    collection.findOne({x, y},
        (err, layout) => {
            if(err) {
                console.log(err)
                next(err)
            }
            //console.log(`GET:\t${collection.namespace} - items: ${layout.length}`)
            res.json(layout)
        }
    )
})

//POST /api/v1/Archiv
router.get("/layouts", async (req, res, next) => {
    let { a, w, skip, limit } = req.query
    limit ? limit = parseInt(limit) : limit = 50
    skip ? skip = parseInt(skip) : skip = 0
    try {
        const collection = req.db.collection(`layouts_${w}`)
        const layouts = await collection
            .find()
            .sort({tib: -1})
            .limit(limit)
            .skip(skip*limit)
            .toArray()
        console.log(`GET:\t${collection.namespace} - items: ${layouts.length}`)
        res.json(layouts)
    } catch(err) {
        console.log({err})
        next(err)
    }
})


//POST /api/v1/layouts
router.post("/layouts", async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://prodgame08.alliances.commandandconquer.com')
    res.send()
    let {db, body, headers, query} = req
    const { w } = query
    if(headers['content-type'].includes("text")) body = JSON.parse(body)

    const layouts = await Object.keys(body).map(key => {
        const [x, y] = key.split(":")
        const layoutString = body[key].layout.slice(0, 72)
        const {tib, cris} = layoutStats(layoutString)
        return {
            x,
            y,
            level: body[key].level,
            alliance: body[key].alliance,
            world: body[key].world,
            player: body[key].player,
            layout: layoutString,
            time: new Date(),
            tib,
            cris
        }
    })
    const collection = db.collection(`layouts_${w}`)
    console.log(`POST: collection: ${collection.namespace} - items: ${layouts.length}`)

    await layouts.forEach(layout => {
        collection.updateOne({x: layout.x, y: layout.y}, layout, { upsert: true }, (err, result) => {
            if(err) {
                next(err)
                throw err
            }
        })
    })
    //npm console.log(layouts)

})

export default router