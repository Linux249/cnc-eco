import { layoutStats } from '../utils/layout';
import { Router } from 'express';
import { createReport } from '../service/report';

const router = Router();

// POST /api/v1/Archiv
router.get('/db', async (req, res, next) => {
    try {
        const collections = await req.db.listCollections().toArray();
        res.json(collections);
    } catch (e) {
        next(e);
    }
});

router.get('/db/reports', async (req, res, next) => {
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

router.get('/db/createReport', async (req, res, next) => {
    try {
        const report = await createReport(req.db);
        res.json(report);
    } catch (e) {
        next(e);
    }
});

// TODO Add this to scheduling
// POST /api/v1/layouts
router.get('/deleteOldLayouts/:days', async (req, res, next) => {
    const days = Number(req.params.days);
    const date = new Date();
    date.setDate(date.getDate() - days);
    req.db.listCollections().toArray((err, allCollections) => {
        allCollections.map(async coll => {
            if (coll.name.includes('layouts')) {
                console.log(coll.name);
                const curser = await req.db.collection(coll.name).remove({ time: { $lt: date } });
                console.log(
                    `DELETE LAYOUTS on ${coll.name} #${curser.result.n} - status: ${
                        curser.result.ok
                        }`
                );
            }
        });
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
                            `Layout: ${layout.x}:${layout.y} bevor: ${layout.tib}:${
                                layout.cris
                                } after: ${tib}:${cris}`
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

export default router;
