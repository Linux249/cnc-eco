'use strict'
import { Router } from "express"
const router = Router()


// GET /api/v1/layout
// get a single labtop with world + coords as params
router.post("/ingameData", (req, res, next) => {
    const { w, x,y } = req.query
    // TODO auth require
    console.log(req.body)

    // const collection = req.db.collection(`layouts_${w}`)
    // collection.findOne({x, y},
    //     (err, layout) => {
    //         if(err) {
    //             console.log(err)
    //             next(err)
    //         }
    //         //console.log(`GET:\t${collection.namespace} - items: ${layout.length}`)
    //         res.json(layout)
    //     }
    // )
    //
    res.send("UPDATED")
})
