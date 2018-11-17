import World from '../model/World';
// GET /api/v1/worlds?name=linux249
export default async (req, res, next) => {
    const { db } = req;
    const { name } = req.query;
    if (!name) return next(new Error('No name'));
    try {
        const worlds = await World.find();
        const worldsWherePlayerExist = [];
        await Promise.all(worlds.map(async w =>
            await db.collection(`players_${w.worldId}`).findOne({ name }) &&
                    worldsWherePlayerExist.push(w)));
        res.json({ worlds: worldsWherePlayerExist });
    } catch (e) {
        next(e);
    }
};
