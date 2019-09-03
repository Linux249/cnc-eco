import { layoutStats } from '../utils/layout';

/**
 * POST /api/v1/layouts
 * rules:
 * - the client protecting to get layouts from other worlds
 */
export default async (req, res, next) => {
    res.send(); // todo layouts update send empty body, check what happens if they send something back

    let { db, body, headers, query } = req;
    const { w, pl, a } = query;
    if (headers['content-type'].includes('text')) body = JSON.parse(body);

    const layouts = Object.keys(body).map(key => {
        const [x, y] = key.split(':');
        const layoutString = body[key].layout.slice(0, 72);
        const { tib, cris, power, powerLayout } = layoutStats(layoutString);
        return {
            x: +x,
            y: +y,
            level: body[key].level,
            alliance: +a,
            world: w,
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
    console.log(`UPDATE LAYOUTS: ${pl} update ${layouts.length}# on ${w}`);

    await layouts.forEach(layout => {
        const filter = { x: +layout.x, y: +layout.y, alliance: +a };
        if (+a === 0) filter.player = pl;
        collection.updateOne(filter, layout, { upsert: true }, err => {
            if (err) next(err);
            // console.log(result.result);
        });
    });
};
