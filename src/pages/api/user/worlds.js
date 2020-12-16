import { connectDB } from '../../../lib/api/db';
import { authMiddleware } from '../../../lib/api/middleware';
import World from '../../../lib/api/model/World';

// GET // api/user/worlds?name=linux249
const worlds = async (req, res) => {
    const { user, query = {} } = req;
    const { name } = query;
    console.log('Req: /api/user/worlds', user, name);
    if (!user) throw Error('fatal auth error, the middleware should protect this');
    if (!name) throw Error('Error: query "name" missing');

    const db = await connectDB().db();
    if (req.method === 'GET') {
        const worlds = await World.find();
        const worldsWherePlayerExist = [];
        await Promise.all(
            worlds.map(
                async (w) =>
                    (await db.collection(`players_${w.worldId}`).findOne({ name })) &&
                    worldsWherePlayerExist.push(w)
            )
        );
        return res.json({ worlds: worldsWherePlayerExist });
    }
};

export default authMiddleware(worlds);
