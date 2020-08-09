import { layoutStats } from '../utils/layout';
import { Router } from 'express';
import { createReport } from '../service/report';
import User from '../model/User';
import World from '../model/World';

const router = Router();

/**
 * GET /api/v1/db
 * returns an array with all collections
 * */
router.get('/', async (req, res, next) => {
    try {
        const collections = await req.db.listCollections().toArray();
        res.json(collections);
    } catch (e) {
        next(e);
    }
});

router.get('/reports', async (req, res, next) => {
    try {
        const reports = await req.db
            .collection('reports')
            .find()
            .toArray();
        res.json(reports);
    } catch (e) {
        next(e);
    }
});

router.get('/createReport', async (req, res, next) => {
    try {
        const report = await createReport(req.db);
        res.json(report);
    } catch (e) {
        next(e);
    }
});

/**
 * GET /api/v1/db/deleteOldLayouts/:days
 * delete all layouts older than x days
 */
router.get('/deleteOldLayouts/:days', async (req, res, next) => {
    const days = Number(req.params.days);
    const date = new Date();
    date.setDate(date.getDate() - days);
    req.db.listCollections().toArray(async (err, allCollections) => {
        await Promise.all(
            allCollections.map(async coll => {
                if (coll.name.includes('layouts')) {
                    console.log(coll.name);
                    const curser = await req.db
                        .collection(coll.name)
                        .remove({ time: { $lt: date } });
                    console.log(
                        `DELETE LAYOUTS on ${coll.name} #${curser.result.n} - status: ${curser.result.ok}`
                    );
                }
            })
        );
        console.log('finish delete layouts');
        res.json('wann');
    });
});

/**
 * GET /api/v1/db/deleteOldReports/:days
 * delete all reports older than x days
 */
router.get('/deleteOldReports/:days', async (req, res, next) => {
    const days = Number(req.params.days);
    const date = new Date();
    date.setDate(date.getDate() - days);
    const data = await req.db.collection('reports').remove({ date: { $lt: date } });

    console.log(data);
    res.json(data);
});

/**
 * GET /api/v1/db/deleteOldPlayers/:days
 * delete all players older than x days
 */
router.get('/deleteOldPlayers/:days', async (req, res, next) => {
    const days = Number(req.params.days);
    const date = new Date();
    date.setDate(date.getDate() - days);
    req.db.listCollections().toArray(async (err, allCollections) => {
        await Promise.all(
            allCollections.map(async coll => {
                if (coll.name.includes('players')) {
                    console.log(coll.name);
                    const curser = await req.db
                        .collection(coll.name)
                        .remove({ _updated: { $lt: date } });
                    console.log(
                        `DELETE PLAYERS on ${coll.name} #${curser.result.n} - status: ${curser.result.ok}`
                    );
                }
            })
        );
        console.log('finish delete players');
        res.json('wann');
    });
});

router.get('/repairLayouts', async (req, res, next) => {
    const { db } = req;
    await db.listCollections().toArray((err, collInfos) => {
        collInfos.map(coll => {
            console.log(coll);
            if (coll.name.includes('layouts')) {
                const collection = db.collection(coll.name);
                collection.find().toArray((err, layouts) => {
                    if (err) {
                        console.log(err);
                        next(err);
                    }
                    console.log(`cleaning: ${coll.name} found items: ${layouts.length}`);
                    layouts.map(layout => {
                        const { tib, cris } = layoutStats(layout.layout);
                        console.log(
                            `Layout: ${layout.x}:${layout.y} bevor: ${layout.tib}:${layout.cris} after: ${tib}:${cris}`
                        );
                        layout.tib = tib;
                        layout.cris = cris;
                        collection.updateOne(
                            { x: layout.x, y: layout.y },
                            layout,
                            { upsert: true },
                            (err, result) => {
                                if (err) {
                                    next(err);
                                    throw err;
                                }
                            }
                        );
                    });
                });
            }
        });
    });
    res.json('all docs clean');
});

router.get('/layoutsFrom/:world', (req, res) => {
    console.log('layoutsFrom');
    // TODO auth require
    req.db.collection(`layouts_${req.params.world}`).distinct('player', (err, players) => {
        console.log(players);

        res.json(players);
    });
});

/**
 * update the worlds from every user
 */
router.get('/updateAllUsersWorlds', async (req, res, next) => {
    try {
        const users = await User.find();
        const worlds = await World.find();
        await Promise.all(
            users.map(async user => {
                const name = user.player;
                user.worlds = []; // reset worlds
                await Promise.all(
                    worlds.map(async w => {
                        const player = await req.db
                            .collection(`players_${w.worldId}`)
                            .findOne({ name });
                        player &&
                            user.worlds.push({
                                worldId: w.worldId,
                                worldName: player.serverName,
                                player_id: player._id,
                                playerId: player.playerId,
                                allianceId: player.allianceId,
                            });
                    })
                );
                await user.save();
            })
        );
    } catch (e) {
        return next(e);
    }
    res.json({ success: 'all user updated' });
});

/**
 * get several server informations
 */
router.get('/getFooterStats', async (req, res, next) => {
    try {
        const users = await User.count();
        const worlds = await World.count();
        const report = await req.db
            .collection('reports')
            .findOne({}, {}, { sort: { createdAt: -1 } });
        const stats = await req.db.stats({ scale: 1048576 }); // MB
        res.json({ worlds, users, report, size: stats.storageSize });
    } catch (e) {
        return next(e);
    }
});

export default router;
