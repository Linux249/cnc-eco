const report = {
    date: new Date(), // current time
    server: [
        /*
         * size: MB  // DB size
         */
    ],
    worlds: [
        /* {
         * world: name,
         * deletedLayouts: count,
         * stats: collection.stats()
         *
         */
    ],
    player: {
        /*
         * collection.stats()
         * newestPlayer: [{ playername , worlds }]
         */
    },
};

export const createReport = async (db) => {
    const date = new Date();
    date.setDate(date.getDate() - 14); // date 14 days before now

    try {
        // collections for the layouts
        const collections = await db.listCollections().toArray();
        const layoutsColl = collections.filter(coll => coll.name.includes('layouts'));

        // got throug each World/collection
        await Promise.all(layoutsColl.map(async ({ name }) => {
            const collection = await db.collection(name);
            const reportWorld = {
                name,
                deletedLayouts: null,
                stats: null,
            };

                // deleting old layouts
            const { result } = await collection.remove({ time: { $lt: date } });
            if (!result.ok) console.log('FEHLER BEIM LÖSCHEN VON LAYOUTS'); // TODO bedder error handling
            reportWorld.deletedLayouts = result.n;

            // getting db stats
            // TODO analyzing stas document and pic only relevant infos
            reportWorld.stats = await collection.stats({ scale: 1024 });

            report.worlds.push(reportWorld);
        }));

        // PLAYER
        report.player.stats = await db.collection('players').stats({ scale: 1024 });

        // save and return report
        await db.collection('reports').save(report);
        return report;
    } catch (e) {
        // TODO proper error handling
        console.error(e.message);
        console.error(e);
    }
};
