'use strict'
import { layoutStats } from '../utils/layout'
import { Router } from "express"
const router = Router()

//POST /api/v1/Archiv
router.get("/layouts", (req, res, next) => {
    const { a, w } = req.query
    // TODO auth require

    const collection = req.db.collection(`layouts_${w}`)
    collection.find().toArray(
        (err, layouts) => {
            if(err) {
                console.log(err)
                next(err)
            }
            console.log(`GET:\t${collection.namespace} - items: ${layouts.length}`)
            res.json(layouts)
        }
    )
})


//POST /api/v1/layouts
router.post("/layouts", async (req, res, next) => {
    res.send()
    let {db, body, headers, query} = req
    const { w } = query
    if(headers['content-type'].includes("text")) body = JSON.parse(body)

    const layouts = Object.keys(body).map(key => {
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