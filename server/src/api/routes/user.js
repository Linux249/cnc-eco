import { Router } from 'express';
import User from '../model/User';
import Token from '../model/Token';
import World from '../model/World';

const router = Router();

// GET /api/v1/user
router.get('/user', async (req, res) => {
    // console.log(User)
    const user = await User.find({});
    res.json(user);
});

// DELETE /api/v1/user/5bd708bfd279eb34d088bc69
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.remove({ _id: id });
        const token = await Token.remove({ _userId: id });
        res.json({ user, token });
    } catch (e) {
        res.json(e);
    }
});

// router.post('/user/requestedPlayer', async (req, res, next) => {
//     const { user } = req;
//     const { name } = req.body;
//     // Test if the player doesn't used from other account
//     if (!name) return next(new Error('playername missing'))
//     const userWhoOwnsPlayer = await User.findOne({ player: name });
//     console.log({name, user, userWhoOwnsPlayer})
//     if (userWhoOwnsPlayer) {
//         return next(new Error('Cannot add Player: Player belongs already to somebody else'));
//     }
//
//     user.requestedPlayerName = name;
//     user.token = generateToken();
//     await user.save().catch(e => next(e));
//     return res.json({ success: 'click ingame at "get token" in cnc-eco menu' });
// });

router.post('/user/addPlayerName', async (req, res, next) => {
    // name is player name given from user
    const { user, db } = req;
    const { token } = req.body;
    // TODO worldName comes also from where user choose world later

    // get name from token object that belongs to token from request
    const savedToken = await Token.findOne({ type: 'name', token });
    if (!savedToken)
        return next(new Error('cannot find token - request new token from ingame menu'));
    const { name } = savedToken;
    console.log({ name, token, user });

    // do not allow to add a player to account who already belongs to other account
    const existingUser = await User.findOne({ player: name });
    if (existingUser) return next(new Error('player already belongs to other user'));

    user.player = name;
    user.playerAdded = new Date();
    user.worlds = []; // todo remove after testing

    // add all worlds with player data
    try {
        const worlds = await World.find();
        await Promise.all(
            worlds.map(async w => {
                const player = await db.collection(`players_${w.worldId}`).findOne({ name });
                player &&
                    user.worlds.push({
                        worldId: w.worldId,
                        worldName: player.serverName,
                        player_id: player._id,
                    });
            })
        );

        user.save((err, doc) => {
            if (err) return next(err);
            return res.json(doc);
        });
    } catch (e) {
        return next(e);
    }
});

// router.post('/user/addWorld', async (req, res, next) => {
//     // name is player name given from user
//     const { name, worldId } = req.body;
//     // TODO worldName comes also from where user choose world later
//     console.log({ name, worldId });
//     if (!name) return next(new Error('Player name missing'));
//     if (!worldId) return next(new Error('World missing'));
//
//     const user = req.user;
//     // TODO that schould never happen
//     if (!user) {
//         console.log(user);
//         return next(new Error('Cannot add Player: User in not Logged in valid'));
//     }
//
//     // ANTI HACK Test if the player really is in User saved already
//     if (user.player !== name) {
//         return next(new Error("Cannot add Player: Player doesn't belong to this Account"));
//     }
//
//     // Test if player exists on the world
//     const collection = req.db.collection(`players_${worldId}`);
//     if (!collection) {
//         // should not happen because user cannot add any world
//         return next(new Error("Cannot add Player: World doesn't exist in db"));
//     }
//
//     // find player
//     const player = await collection.findOne({ name });
//     if (!player) {
//         // TODO rework error - this route should not be accessible without existing player name
//         console.log('no player found');
//         console.log(player);
//         return next(
//             new Error('Cannot add World: Player name not found - please update data ingame')
//         );
//     }
//
//     // Test if world not added already
//     // UI protect this situation - raise higher error lvl for logging potential ui bugs
//     if (user.worlds.some(e => +e.worldId === +worldId))
//         return next(new Error('Cannot add World: World is already added to your user'));
//
//     // console.log(player)
//
//     // Test if player is updated in last 2 min
//     if (player._updated) {
//         user.worlds.push({
//             worldId,
//             worldName: player.serverName,
//             player_id: player._id,
//         });
//         // const r = await collection.update({_id: player._id}, player)
//         user.save((err, doc) => {
//             if (err) return next(err);
//             console.log(
//                 `Player ${player.name} added world  ${player.serverName} to user ${user.local.email}`
//             );
//             return res.json(doc);
//         });
//     } else {
//         return next(
//             new Error('Cannot add Player: Player has never updated - please update data ingame')
//         );
//     }
//
//     // add player to user and time
// });

router.get('/user/updateWorlds', async (req, res, next) => {
    const { user, db } = req;
    const name = user.player;
    user.worlds = []; // reset worlds

    // add all worlds with player data
    try {
        const worlds = await World.find();
        await Promise.all(
            worlds.map(async w => {
                const player = await db.collection(`players_${w.worldId}`).findOne({ name });
                player &&
                    user.worlds.push({
                        worldId: w.worldId,
                        worldName: player.serverName,
                        player_id: player._id,
                        allianceId: player.allianceId,
                    });
            })
        );

        user.save((err, doc) => {
            if (err) return next(err);
            return res.json(doc);
        });
    } catch (e) {
        return next(e);
    }
});
//
// router.post('/user/removeWorld', async (req, res, next) => {
//     // name is player name given from user
//     const { worldId } = req.body;
//     // TODO worldName comes also from where user choose world later
//     console.log(req.body);
//     //if (!name) return next(new Error('Player name missing'));
//     if (!worldId) return next(new Error('World missing'));
//
//     const user = req.user;
//     if (!user.player) {
//         console.log(user);
//         return next(new Error('Cannot remove World: Player name is missing'));
//     }
//
//     // Test if player exists on the world
//     const collection = req.db.collection(`players_${worldId}`);
//     if (!collection) {
//         // should not happen because user cannot add any world
//         return next(new Error("Cannot add Player: World doesn't exist in db"));
//     }
//
//     // find player
//     /* const player = await collection.findOne({ name });
//     if (!player) {
//         // TODO rework error - this route should not be accessible without existing player name
//         return next(
//             // TODO REPORT THIS ISSUE to LOGGING!
//             new Error('Cannot remove World: loggin player not found')
//         );
//     }*/
//
//     // Test if world not added already
//     // UI protect this situation - raise higher error lvl for logging potential ui bugs
//     if (!user.worlds.some(e => +e.worldId === +worldId)) {
//         // TODO record issue cause of ui bug potential
//         return next(new Error('Cannot remove World: World is not in List'));
//     }
//     // console.log(player)
//
//     // Test if player is updated in last 2 min
//     try {
//         user.worlds = user.worlds.filter(o => o.worldId !== worldId);
//         // const r = await collection.update({_id: player._id}, player)
//         user.save((err, doc) => {
//             if (err) return next(err);
//             //console.log(`Player ${player.name} from ${player.serverName} remove world ${worldId}`);
//             return res.json(doc);
//         });
//     } catch (e) {
//         return next(e);
//     }
//
//     // add player to user and time
// });

export default router;
