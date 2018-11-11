// import Player from '../model/Player';
import { Router } from 'express';
const ObjectId = require('mongodb').ObjectId
const router = Router();

// GET // api/v1/player?name=22&w=123
router.get('/player', async (req, res, next) => {
    const { player, world } = req.query;
    // TODO auth require

    const collection = req.db.collection(`players_${world}`);

    const data = await collection.findOne({ _id: ObjectId(player)});

    // const player = await Player.findOne({name})
    res.json(data);
});

// create new one
/* router.post("/player", async (req, res, next) => {
    const obj = new Player(req.body)
    obj.save((err, data) => {
        if (err) return next(err)
        res.status = 201 // saved sucs..
        res.json(data)  //Send saved data back
    })
})

router.put("/player", async function(req, res, next) {
    const { name } = req.query
    const player = await Player.findOne({name})
    player.set(req.body)
    player.save((err, data) => {
        if (err) return next(err)
        res.status = 201 // saved sucs..
        res.json(data)  //Send saved data back
    })
}) */

export default router;

const player = {
    name: String,
    worlds: [
        {
            name: { type: String, default: 'missing!!' }, // name of the world
            w: Number, // id of the world
            bases: [
                {
                    name: { type: String, default: 'missing!!' },
                    layout: String, // only 72 as length!
                },
            ],
        },
    ],
};
