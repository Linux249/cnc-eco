'use strict'
import MongoClient from 'mongodb'
import { layoutStats } from '../utils/layout'
import { Router } from "express"
const router = Router()

const mongo_uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/cnc"

//POST /api/v1/Archiv
router.get("/layouts", (req, res, next) => {
    const { a, w } = req.query
    // TODO auth require
    MongoClient.connect(mongo_uri, (err, db) => {
        if (err) throw err;
        db.collection(`_${w}`).find({alliance: a}).toArray(
            (err, layouts) => {
                if(err) next(err)
                res.json(layouts)
            }
        )

    })
})



//POST /api/v1/layouts
router.post("/layouts", (req, res, next) => {
    const {body, query} = req
    const { w } = query

    MongoClient.connect(mongo_uri, (err, db) => {
        if (err) throw err;
        const layouts = Object.keys(body).map(key => {
            const [x, y] = key.split(":")
            const layoutString = body[key].layout.slice(0, 71)
            const {tib, cris} = layoutStats(layoutString)
            const layout = {
                x,
                y,
                level: body[key].level,
                alliance: body[key].alliance,
                world: body[key].world,
                player: body[key].player,
                layout: layoutString,
                tib,
                cris
            }
            db.collection(`_${w}`).update({x, y}, layout, { upsert: true }).catch(e => console.log("Fehler beim Speichern eines Layouts", e))
            return layout
        })

        res.json(layouts)
        db.close();
    });
})

export default router









const delete1 =  {
    method: 'POST',
    path:'/layout',
    handler: function (request, reply) {
        const newLayouts = JSON.parse(request.payload)
        //console.log(request)
        console.log(request.params)
        const { pl, w, a} = request.params.query
        console.log(newLayouts)
        console.log({ pl, w, a})
        // TODO test w to be a real world!!!

        World.findOne({name: w}, (err, world) => {
            if(err) console.log(err)
            if(!world) world = new World({name: w})     //create new player on this world
            world.players
        })

        Player.findOne({name: pl}, (err, player) => {
            if(err) reply(err)
            player.worlds.map(world => {
                if(world === w) {
                    const Layout = mongoose.model(`layouts-${w}`, layoutSchema)
                    Object.keys(newLayouts).map(key => {
                        const {x, y} = newLayouts[key]
                        Layout.find({x, y}, (err, layout)=> {
                            if(err) console.log(err)
                            if(layout) {
                                // test if layout has change
                                if(layout.layout !== newLayouts[key].layout) Layout.update(newLayouts[key])
                            } else {
                                Layout.create(newLayouts[key])
                            }
                        })
                    })
                }
            })
        })

        return reply(1);
    }
}