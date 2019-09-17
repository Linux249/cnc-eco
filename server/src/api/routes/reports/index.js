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

/**
 * POST /api/v1/reports/update
 * update reports from ingame
 */
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

    const savedReportsIds = []     // all reports id which are saved
    const oldReportsIds   = []  // all reports id who are already saved

    const ids = await Promise.all(
        reports.map(async report => {
            report.playerId = playerId;
            report.accountId = accountId;
            const old = await collection.findOne({ id: report.id });
            if (old) {
                // console.log('old: ' + report.id);
                savedReportsIds.push(report.id);
                return report.id;
            } else {
                report.time = new Date();
                // console.log('save: ' + report.id);
                return await collection
                    .save(report)
                    .then(() => oldReportsIds.push(report.id) && report.id)
                    .catch(e => next(e));
            }
        })
    );
    console.log(`SAVE REPORTS: new ${savedReportsIds.length} old: ${oldReportsIds.length}` )

    res.send(ids);

    // todo send saved id's back to put them "out of sight" in the client
});

/**
 * GET /api/v1/reports/:type/:world/:playerId/:baseId
 * /api/v1/reports/off/:world/:playerId/:baseId
 * ???
 */
router.get('/:type/:world/:playerId/:baseId', async (req, res, next) => {
    let { type, world, playerId, baseId } = req.params;
    console.log({ type, world, playerId, baseId });
    if ((type !== 'off' && type !== 'def' )|| !world || !playerId || !baseId) next(new Error('wrong url param'))
    try {
        const reports = await getReportsStats(world, playerId, baseId, type, req.db);
        // console.log(reports);
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
    reports.c = reports.reports.length;

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

    // res
    reports.tibTotal = reports.reports.reduce(
        (a, r) => (r.loot['1'] ? a + r.loot['1'] : a),
        0
    );
    reports.crisTotal = reports.reports.reduce(
        (a, r) => (r.loot['2'] ? a + r.loot['2'] : a),
        0
    );
    reports.creditsTotal = reports.reports.reduce(
        (a, r) => (r.loot['3'] ? a + r.loot['3'] : a),
        0
    );
    reports.researchTotal = reports.reports.reduce(
        (a, r) => (r.loot['6'] ? a + r.loot['6'] : a),
        0
    );


    return reports;
}
