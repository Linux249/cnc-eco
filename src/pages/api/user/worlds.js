import { connectDB } from '../../../lib/api/db';
import { authMiddleware } from '../../../lib/api/middleware';

/**
 * update the worlds inside the user
 * todo test max size of worlds in user for a jwt token
 * @var user.name comes from jwt token -> update worlds only allowed for own account
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
// GET // api/user/worlds
const worlds = async (req, res) => {
    const { user } = req;
    if (!user) throw Error('fatal auth error, the middleware should protect this');
    const { name, email, player } = user;
    console.log(req.method, 'Req: /api/user/worlds', user, name, player);

    const db = await connectDB().then(async (client) => await client.db());

    // get all worlds saved in the user
    if (req.method === 'GET') {
        const users = await db.collection('users');
        const { worlds } = await users.findOne({ email }, { projection: { _id: 0, worlds: 1 } });
        console.log({ worlds });
        return res.json({ worlds });
    }
    // update with scan through lookup all player collections
    if (req.method === 'PUT') {
        if(!name) return res.status(400).json({message: 'Add a player name fist!'})
        const World = (await import('../../../lib/api/model/World')).default;
        // console.log({ World });
        const worlds = await World.find();
        const worldsWherePlayerExist = [];
        await Promise.all(
            worlds.map(
                async (w) =>
                    (await db.collection(`players_${w.worldId}`).findOne({ name })) &&
                    worldsWherePlayerExist.push({ id: w.worldId, name: w.worldName })
            )
        );

        const users = await db.collection('users');
        // todo error handling maybe?
        await users.updateOne({ email }, { $set: { worlds: worldsWherePlayerExist } });
        return res.json({ worlds: worldsWherePlayerExist });
    }
};

export default authMiddleware(worlds);
