'use strict'
import { Router } from "express"
const router = Router()
import Alliance from '../model/Alliance'

// GET // api/v1/alliance?world=22&alliance=123
router.get("/alliance", async (req, res, next) => {
    console.log("Test logs in /alliance")
    const { world } = req.query
    const allianceId = req.query.alliance

    if(!world) next(new Error("world id is missing"))
    if(!allianceId) next(new Error("alliance id is missing"))

    const aId = Number(`${allianceId}${world}`)

    console.log({ world, allianceId, aId })

    const alliance = await Alliance.findOne({allianceId: aId})

    if(!alliance) next(new Error("No valid alliance id"))

    // WORLD OF PLAYER
    const collection = req.db.collection(`players_${world}`)

    console.log(alliance)
    await Promise.all(alliance.members.map(async (member, i) => {
        // TODO was wen kein player gefunden wird?
        console.log(member)
        const { playerId } = member
        const player = await collection.findOne({playerId})
        // update player
        alliance.members[i] = {...member, ...player}
    }))


    // TODO auth require

    res.json(aliance)
})


export default router