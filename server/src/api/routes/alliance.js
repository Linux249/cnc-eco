import { Router } from 'express';
import Alliance from '../model/Alliance';

const router = Router();

// GET // api/v1/alliance?world=22&alliance=123
router.get('/alliance', async (req, res, next) => {
    // console.log('Test logs in /alliance');
    const { world, alliance: allianceId } = req.query;

    if (!world) return next(new Error('world id is missing'));
    if (!allianceId) return next(new Error('alliance id is missing'));

    const aId = Number(`${allianceId}${world}`);

    // console.log({ world, allianceId, aId });

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
            // console.log(player);
            if (player) alliance.members[i] = { role: member.role, ...player, data: true };
            else alliance.members[i].data = false;
            return player;
        })
    );

    // TODO auth require

    // console.log(alliance);
    res.json(alliance);
});

export default router;
