import { Router } from 'express';

const router = Router();

// GET /api/v1/layout
// get a single layout with world + coords as params
router.get('/layout', (req, res, next) => {
    const { w, x, y } = req.query;
    // TODO auth require

    const collection = req.db.collection(`layouts_${w}`);
    collection.findOne({ x, y }, (err, layout) => {
        if (err) {
            console.log(err);
            next(err);
        }
        // console.log(`GET:\t${collection.namespace} - items: ${layout.length}`)
        res.json(layout);
    });
});

/**
 * GET /api/v1/layouts
 * QUERY: w world, skip, limit, sort
 *
 * get all layouts from a world
 */

router.get('/layouts', async (req, res, next) => {
    let { w, skip, limit, sort, a } = req.query;
    const { player } = req.user;
    limit = limit ? +limit : 50;
    skip = skip ? +skip : 0;
    if (!sort) sort = 'tib';
    try {
        const collection = req.db.collection(`layouts_${w}`);
        const filter = { alliance: +a };
        // if player has no alli save for each player who saw the layout

        if (+a === 0) filter.player = player;
        console.log(filter);
        const layouts = await collection
            .find(filter)
            .sort({ [sort]: -1 })
            .limit(limit)
            .skip(skip * limit)
            .toArray();
        // console.log(`GET:\t${collection.namespace} - items: ${layouts.length}`);
        res.json(layouts);
    } catch (err) {
        console.log({ err });
        next(err);
    }
});

export default router;
