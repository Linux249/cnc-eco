// POST /api/v1/layouts
export default async (req, res, next) => {
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
};
