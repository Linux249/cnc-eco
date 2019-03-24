import { Router } from 'express';

const router = Router();
/*
    Schema
    { reports:
   [ { id: 1550231,
       attackerBaseId: 2712990,
       defenderBaseId: 4001489,
       maxRep: 7,
       infRep: [Object],
       vehRep: [Object],
       airRep: [Object],
       distance: 2,
       pve: true,
       minCp: 12,
       maxCp: 16,
       time: 1553336894210 },
     { id: 1550143,
       attackerBaseId: 2712990,
       defenderBaseId: 4001489,
       maxRep: 1255,
       infRep: [Object],
       vehRep: [Object],
       airRep: [Object],
       distance: 2,
       pve: true,
       minCp: 12,
       maxCp: 16,
       time: 1553336795200 },
     { id: 1552314,
       attackerBaseId: 2712990,
       defenderBaseId: 4058007,
       maxRep: 664,
       infRep: [Object],
       vehRep: [Object],
       airRep: [Object],
       distance: 2,
       pve: true,
       minCp: 12,
       maxCp: 16,
       time: 1553340502207 },
     { id: 1552296,
       attackerBaseId: 2712990,
       defenderBaseId: 4070658,
       maxRep: 664,
       infRep: [Object],
       vehRep: [Object],
       airRep: [Object],
       distance: 1.4142135623730951,
       pve: true,
       minCp: 11,
       maxCp: 14,
       time: 1553340462203 },
     { id: 1558981,
       attackerBaseId: 2712990,
       defenderBaseId: 4088300,
       maxRep: 479,
       infRep: [Object],
       vehRep: [Object],
       airRep: [Object],
       distance: 1,
       pve: true,
       minCp: 11,
       maxCp: 13,
       time: 1553351906203 } ],
  world: 402,
  player: 'linux249',
  playerId: 10311,
  accountId: 126671 }
402
[ { id: 1550231,
    attackerBaseId: 2712990,
    defenderBaseId: 4001489,
    maxRep: 7,
    infRep: { d: [Object], c: 2 },
    vehRep: { d: {}, c: 0 },
    airRep: { d: {}, c: 0 },
    distance: 2,
    pve: true,
    minCp: 12,
    maxCp: 16,
    time: 1553336894210 },
  { id: 1550143,
    attackerBaseId: 2712990,
    defenderBaseId: 4001489,
    maxRep: 1255,
    infRep: { d: [Object], c: 2 },
    vehRep: { d: {}, c: 0 },
    airRep: { d: {}, c: 0 },
    distance: 2,
    pve: true,
    minCp: 12,
    maxCp: 16,
    time: 1553336795200 },
  { id: 1552314,
    attackerBaseId: 2712990,
    defenderBaseId: 4058007,
    maxRep: 664,
    infRep: { d: [Object], c: 2 },
    vehRep: { d: {}, c: 0 },
    airRep: { d: {}, c: 0 },
    distance: 2,
    pve: true,
    minCp: 12,
    maxCp: 16,
    time: 1553340502207 },
  { id: 1552296,
    attackerBaseId: 2712990,
    defenderBaseId: 4070658,
    maxRep: 664,
    infRep: { d: [Object], c: 2 },
    vehRep: { d: {}, c: 0 },
    airRep: { d: {}, c: 0 },
    distance: 1.4142135623730951,
    pve: true,
    minCp: 11,
    maxCp: 14,
    time: 1553340462203 },
  { id: 1558981,
    attackerBaseId: 2712990,
    defenderBaseId: 4088300,
    maxRep: 479,
    infRep: { d: [Object], c: 2 },
    vehRep: { d: {}, c: 0 },
    airRep: { d: {}, c: 0 },
    distance: 1,
    pve: true,
    minCp: 11,
    maxCp: 13,
    time: 1553351906203 } ]
 */
// GET /api/v1/reports/update
// get a single labtop with world + coords as params
router.post('/update', async (req, res, next) => {
    console.log('update reports from ingame');
    const { reports, world, accountId, playerId } = req.body;
    // console.log(req.body);
    console.log({ world, playerId, accountId });
    // console.log(reports);
    const collection = req.db.collection(`reports_${world}`);
    console.log(`POST:\t${collection.namespace} - reports: ${reports.length}`);

    if (!reports.length) return res.json([]);
    if (!accountId) return res.code(404).json({ message: 'accountId missing' });
    if (!playerId) return res.code(404).json({ message: 'playerId missing' });
    // const { w, x, y } = req.query;
    // TODO auth require
    const ids = await Promise.all(
        reports.map(async report => {
            report.playerId = playerId;
            report.accountId = accountId;
            const old = await collection.findOne({ id: report.id });
            if (old) {
                console.log('old: ' + report.id);
                return report.id;
            } else {
                console.log('save: ' + report.id);
                return await collection
                    .save(report)
                    .then(() => report.id)
                    .catch(e => next(e));
            }
        })
    );
    console.log(ids);

    // const collection = req.db.collection(`layouts_${w}`);
    // collection.findOne({ x, y }, (err, layout) => {
    //     if (err) {
    //         console.log(err);
    //         next(err);
    //     }
    //     // console.log(`GET:\t${collection.namespace} - items: ${layout.length}`)
    //     res.json(layout);
    // });
    res.send(ids);

    // todo send saved id's back to put them "out of sight" in the client
});

// GET /api/v1/layouts
// get all layouts from a world
// TODO add a way to filter for "saw from player and/or alliance"
router.get('/:type/:world/:playerId/:baseId', async (req, res, next) => {
    let { type, world, playerId, baseId } = req.params;
    console.log({ world, playerId, baseId });
    if ((type !== 'off' && type !== 'def' )|| !world || !playerId || !baseId) next(new Error('wrong url param'))
    try {
        const reports = await getReportsStats(world, playerId, baseId, type, req.db);
        console.log(reports);
        res.json(reports);
    } catch (err) {
        console.log({ err });
        next(err);
    }
});

export default router;

export async function getReportsStats(world, playerId, baseId, type, db) {
    const collection = db.collection(`reports_${world}`);
    const reports = {};
    reports.reports = await collection.find({ playerId: +playerId, [type]: true}).toArray();
    console.log(`GET:\t${collection.namespace} - reports: ${reports.reports.length}`);

    // reports count
    reports.c = reports.length;
    // rep total
    reports.repTotal = reports.reports.reduce((a, r) => a + r.maxRep, 0);
    reports.infTotal = reports.reports.reduce(
        (a, r) => (r.infRep.d['9'] ? a + r.infRep.d['9'] : a),
        0
    );
    reports.vehTotal = reports.reports.reduce(
        (a, r) => (r.vehRep.d['9'] ? a + r.vehRep.d['9'] : a),
        0
    );
    reports.airTotal = reports.reports.reduce(
        (a, r) => (r.airRep.d['9'] ? a + r.airRep.d['9'] : a),
        0
    );
    return reports;
}
