'use strict'
import Player from '../model/Player'
import { Router } from "express"
const router = Router()

// GET // api/v1/player?name=22&w=123
router.get("/player", async (req, res, next) => {
    const { name } = req.query
    // TODO auth require

    const player = await Player.find({name})
    res.json(player)
})

export default router

const player = {
    name: String,
    worlds: [{
        name: {type: String, default: "missing!!" }, // name of the world
        w: Number, // id of the world
        bases: [{
            name: {type: String, default: "missing!!"},
            layout: String, // only 72 as length!
        }]
    }]
}

