'use strict'
import {User} from '../model/User'
import { Router } from "express"
import {Schema} from 'mongoose'
const router = Router()


// GET /api/v1/user
router.get('/user', async (req, res)=> {
    //console.log(User)
    const user = await User.find({})
    res.json(user)
})


// DELETE /api/v1/user/5bd708bfd279eb34d088bc69
router.delete("/user/:id", async (req, res, next) => {
    const { id } = req.params
    // TODO auth require
    //console.log({id})

    try {
        const user = await User.remove({_id: id})
        res.json(user)
    } catch (e) {
        res.json(e)
    }

})


router.post("/user/addPlayer", async (req, res, next) => {
    const { name, worldId, _id } = req.body
    console.log({ name, worldId, _id })

    // Find User first
    const user = await User.findOne({_id})
    if(!user) {
        console.log(user)
        return next(new Error("Cannot add Player: Users id invalid"))
    }

    // Test id user is allowed to add a player again
    if(user.playerAdded) {
        const time = user.playerAdded - new Date()
        console.log(time)
        if(time < 7 && false) return next(new Error("Cannot add Player: Users id invalid"))
    }

    // Test if the player doesn't used from other account
    const userWhoOwnsPlayer = await User.findOne({player: name})
    if(userWhoOwnsPlayer) {
        return next(new Error("Cannot add Player: Player owns somebody else already"))
    }

    // Test if player exists on the world
    const collection = req.db.collection(`players_${worldId}`)
    if(!collection)
        // should not happen because user cannot add any world
        return next(new Error("Cannot add Player: World doesn't exist in db"))

    // find player
    const player = await collection.findOne({name})
    if(!player) {
        console.log("no player found")
        console.log(player)
        return next(new Error("Cannot add Player: Player name not found - please update data ingame"))
    }

    //console.log(player)


    // Test if player is updated in last 2 min
    if(player._updated) {
        const minutes = (player._updated - new Date()) / 1000 / 60
        console.log({minutes})
        if(minutes < -3) {
            // add player to user
            // TODO test if the world is not allready inside

            user.player = name
            user.playerAdded = new Date()

            user.worlds.push({
                worldId: worldId,
                player_id: player._id,
            })
            //const r = await collection.update({_id: player._id}, player)
            user.save((err, doc)=> {
                if(err) return next(err)
                res.json(doc)
            })

        } else next(new Error("Cannot add Player: Player was not updated in the last 3 (" + minutes + ") minutes - please update data ingame"))
    } else next(new Error("Cannot add Player: Player has never updated - please update data ingame"))

    // add player to user and time



})


export default router
