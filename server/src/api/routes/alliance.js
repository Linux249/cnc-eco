import { Router } from 'express';
import Alliance from '../model/Alliance';

const router = Router();

// GET // api/v1/alliance?world=22&alliance=123
router.get('/alliance', async (req, res, next) => {
    console.log('Test logs in /alliance');
    const { world, alliance: allianceId } = req.query;

    if (!world) return next(new Error('world id is missing'));
    if (!allianceId) return next(new Error('alliance id is missing'));

    const aId = Number(`${allianceId}${world}`);

    console.log({ world, allianceId, aId });

    let alliance;
    try {
        alliance = await Alliance.findOne({ allianceId: aId });
    } catch (e) {
        return next(e);
    }

    // TODO check if player who request is inside the alliance=

    if (!alliance) return next(new Error('No alliance found'));

    // WORLD OF PLAYER
    const collection = req.db.collection(`players_${world}`);

    // console.log(alliance)
    await Promise.all(
        alliance.members.map(async (member, i) => {
            // TODO was wen kein player gefunden wird?
            // console.log(member)
            const player = await collection.findOne({ playerId: String(member.playerId) });
            console.log(player);
            if (player) alliance.members[i] = { role: member.role, ...player, data: true };
            else alliance.members[i].data = false;
            return player;
        })
    );
    /*
    const test1 = await collection.find({playerId: String(member.playerId)})
    const test2 = await collection.find({playerId: Number(member.playerId)})
    const test3 = await collection.find({playerId: member.playerId})
    const test4 = await collection.findOne({playerId: String(member.playerId)})
    const test5 = await collection.findOne({playerId: Number(member.playerId)})
    const test6 = await collection.findOne({playerId: member.playerId})
    console.log({test1, test2, test3})
    console.log({test6, test4, test5}) */

    // TODO auth require

    console.log(alliance);
    res.json(alliance);
});

export default router;
