import { connectDB } from '../../../lib/api/db';
import { authMiddleware } from '../../../lib/api/middleware';

/**
 * get player data for own user name,
 * @var world id of the selected world
 */
// GET // /api/player/bases
const player = async (req, res) => {
    const { user, query = {} } = req;
    if (!user) throw Error('fatal auth error, the middleware should protect this');
    const { name } = user;
    const { world } = query;
    console.log(req.method, '/api/player/bases', world, name);

    const db = await connectDB().then(async (client) => await client.db());

    // get all worlds saved in the user
    if (req.method === 'GET') {
        const collection = db.collection(`players_${world}`);
        console.log({collection})

        const data = await collection.findOne({ name });

        res.json(data);
    }
};

export default authMiddleware(player);
