import { layoutStats } from '../utils/layout';

/**
 * POST /api/v1/layouts
 * rules:
 * - the client protecting to get layouts from other worlds
 */
export default async (req, res, next) => {
    try {
        let { db, body, headers, query } = req;
        const { w, pl, a } = query;
        if (headers['content-type'].includes('text')) body = JSON.parse(body);
        console.log(body);

        const layouts = Object.values(body)
            // todo the type (name:) of scanned object is existing in en + de (Fortress/Festung) => check script
            // remove x:0 , y:0 cause this is the fortress
            .filter(e => e.x || e.y)
            .map(base => {
                const { x, y, level } = base;
                const layoutString = base.layout.slice(0, 72);
                const { tib, cris, power, powerLayout } = layoutStats(layoutString);
                return {
                    x: +x,
                    y: +y,
                    level: +level,
                    alliance: +a,
                    // world: +w,
                    player: pl,
                    layout: layoutString,
                    time: new Date(),
                    tib,
                    cris,
                    power,
                    powerLayout,
                };
            });
        const collection = db.collection(`layouts_${w}`);
        console.log(`UPDATE LAYOUTS: ${layouts.length}# from ${pl}(${a}) on ${w}`);

        await layouts.forEach(layout => {
            const filter = { x: +layout.x, y: +layout.y, alliance: +a };
            if (+a === 0) filter.player = pl;
            collection.updateOne(filter, layout, { upsert: true }, err => {
                if (err) next(err);
                // console.log(result.result);
            });
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
    res.send(); // todo layouts update send empty body, check what happens if they send something back
};
