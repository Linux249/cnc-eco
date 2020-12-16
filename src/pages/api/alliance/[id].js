import { connectDB } from '../../../lib/api/db';
import { authMiddleware } from '../../../lib/api/middleware';
import Alliance from '../../../lib/api/model/Alliance';

/**
 * get player data for own user name,
 * @var world id of the selected world
 */
// GET // /api/alliance/[id]
const alliance = async (req, res) => {
    const { user, query = {} } = req;
    if (!user) return new Error('fatal auth error, the middleware should protect this');
    const { name } = user;
    const { id } = query;
    console.log(req.method, '/alliance', name, id);

    const db = await connectDB().then(async (client) => await client.db());

    // get all worlds saved in the user
    if (req.method === 'GET') {
        const collection = db.collection(`players_${id}`);
        const player = await collection.findOne({ name });
        console.log('player: ', !!player)
        if (!player) return res.send({ error: 'no player found' });
        const { allianceId } = player;
        console.log('allianceId: ', allianceId)
        if (!allianceId) return res.send({ error: 'player has no alliance' });

        const aId = Number(`${allianceId}${id}`);
        // console.log({ aId });

        const alliance = await Alliance.findOne({ allianceId: aId });

        if (!alliance) return res.send({ error: 'No alliance found' });

        await Promise.all(
            alliance.members.map(async (member, i) => {
                // TODO was wen kein player gefunden wird?
                // console.log(member)
                const player = await collection.findOne({ playerId: String(member.playerId) });
                // console.log(player);
                if (player) alliance.members[i] = { role: member.role, ...player, data: true };
                else alliance.members[i].data = false;
                return player;
            })
        );

        return res.send(alliance);
    }
};

export default authMiddleware(alliance);
