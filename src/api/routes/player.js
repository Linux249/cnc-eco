import { Router } from 'express';

const ObjectId = require('mongodb').ObjectId;

const router = Router();

// GET // api/v1/player?name=22&w=123
router.get('/player', async (req, res, next) => {
    const { player, world } = req.query;
    // TODO auth require - check alliance, thats means every one can see every member

    const collection = req.db.collection(`players_${world}`);

    const data = await collection.findOne({ _id: ObjectId(player) });

    res.json(data);
});

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
