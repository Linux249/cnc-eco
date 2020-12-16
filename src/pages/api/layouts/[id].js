import { connectDB } from '../../../lib/api/db';
import { authMiddleware } from '../../../lib/api/middleware';
import Alliance from '../../../lib/api/model/Alliance';

/**
 * get player data for own user name,
 * @var world id of the selected world
 */
// GET // /api/layouts/[id]
const layouts = async (req, res) => {
    const { user, query = {} } = req;
    if (!user) return new Error('fatal auth error, the middleware should protect this');
    const { name } = user;
    const { id } = query;
    console.log(req.method, '/layouts', name, id);

    const db = await connectDB().then(async (client) => await client.db());

    // get all worlds saved in the user
    if (req.method === 'GET') {
        const collectionPlayer = await db.collection(`players_${id}`);
        const player = await collectionPlayer.findOne({ name });
        console.log('player: ', !!player);
        if (!player) return res.send({ error: 'no player found' });
        const { allianceId } = player;
        console.log('allianceId: ', allianceId);
        if (!allianceId) return res.send({ error: 'player has no alliance' });

        const aId = Number(`${allianceId}${id}`);
        // console.log({ aId });

        const alliance = await Alliance.findOne({ allianceId: aId });

        if (!alliance) return res.send({ error: 'No alliance found' });

        let { skip = 0, limit = 22, sort = 'tib' } = query;

        const collection = db.collection(`layouts_${id}`);
        const filter = { alliance: +allianceId };
        // todo if player has no alli save for each player who saw the layout

        if (+allianceId === 0) filter.player = name;
        console.log(id, filter);
        const layouts = await collection
            .find(filter)
            .sort({ [sort]: -1 })
            .limit(+limit)
            .skip(+skip * +limit)
            .toArray();
        console.log(`GET:\t${collection.namespace} - items: ${layouts.length}`);
        return res.send(layouts);
    }
};

export default authMiddleware(layouts);
