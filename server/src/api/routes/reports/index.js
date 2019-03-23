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
router.post('/update', (req, res, next) => {
    console.log('update reports')
    const { reports, world } = req.body
    console.log( req.body)
    console.log(world)
    console.log(reports)
    // const { w, x, y } = req.query;
    // TODO auth require

    // const collection = req.db.collection(`layouts_${w}`);
    // collection.findOne({ x, y }, (err, layout) => {
    //     if (err) {
    //         console.log(err);
    //         next(err);
    //     }
    //     // console.log(`GET:\t${collection.namespace} - items: ${layout.length}`)
    //     res.json(layout);
    // });
    res.send('danke')

    // todo send saved id's back to put them "out of sight" in the client
});

// GET /api/v1/layouts
// get all layouts from a world
// TODO add a way to filter for "saw from player and/or alliance"
router.get('/fsdfsdfsdf', async (req, res, next) => {
    let { w, skip, limit } = req.query;
    limit = limit ? +limit : 50;
    skip = skip ? +skip : 50;
    try {
        const collection = req.db.collection(`layouts_${w}`);
        const layouts = await collection
            .find()
            .sort({ tib: -1 })
            .limit(limit)
            .skip(skip * limit)
            .toArray();
        console.log(`GET:\t${collection.namespace} - items: ${layouts.length}`);
        res.json(layouts);
    } catch (err) {
        console.log({ err });
        next(err);
    }
});

export default router;
