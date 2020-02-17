import Report from '../model/Report';

export const createReport = async db => {
    console.log('Start creating db report');
    const removeLayoutDate = new Date();
    removeLayoutDate.setDate(removeLayoutDate.getDate() - 14); // date 14 days before now

    const removePlayerDate = new Date();
    removePlayerDate.setDate(removePlayerDate.getDate() - 365);

    const removeReportsDate = new Date();
    removeReportsDate.setDate(removePlayerDate.getDate() - 30);

    const report = new Report();

    try {
        // all collections
        const collections = await db.listCollections().toArray();
        // get layouts collection
        const layoutsColl = collections.filter(coll => coll.name.includes('layouts_'));
        // get reports collection
        const reportsColl = collections.filter(coll => coll.name.includes('reports_'));
        // get all player collections
        const playerColl = collections.filter(coll => coll.name.includes('players_'));

        // got through each World/collection
        await Promise.all(
            layoutsColl.map(async ({ name }) => {
                const collection = await db.collection(name);

                // deleting old layouts
                const { result } = await collection.remove({
                    time: { $lt: removeLayoutDate },
                });

                if (!result.ok) console.log('FEHLER BEIM LÖSCHEN VON LAYOUTS'); // TODO bedder error handling

                // getting db stats
                const stats = await collection.stats({
                    scale: 1024,
                });

                if (stats.count === 0) {
                    await collection.drop();
                    console.log('delete collection: ' + name);
                }

                report.layouts.push({
                    worldId: name.split('_')[1],
                    del: result.n, // how many deleted player
                    count: stats.count, // how many player after
                    size: stats.size,
                });
            })
        );
        /*await Promise.all(
            reportsColl.map(async ({ name }) => {
                const collection = await db.collection(name);
                const reportWorld = {
                    name,
                    deletedReports: null,
                    stats: null,
                };

                // deleting old layouts
                const { result } = await collection.remove({
                    time: { $lt: removeLayoutDate },
                });
                if (!result.ok) console.log('FEHLER BEIM LÖSCHEN VON Reports'); // TODO bedder error handling
                reportWorld.deletedReports = result.n;

                // getting db stats
                // TODO analyzing stas document and pic only relevant infos
                // reportWorld.stats = await collection.stats({
                //     scale: 1024,
                // });

                report.worldsReports.push(reportWorld);
            })
        );
        console.log({ report, playerColl });*/


        /**
         * collect data for each player collection
         */
        await Promise.all(
            playerColl.map(async ({ name }) => {
                const collection = await db.collection(name);

                // deleting old layouts
                const { result } = await collection.remove({
                    _updated: { $lt: removePlayerDate },
                });
                if (!result.ok) console.log('FEHLER BEIM LÖSCHEN VON Playern'); // TODO bedder error handling
                // console.log(result);
                const stats = await collection.stats({
                    scale: 1024,
                });

                if (stats.count === 0) {
                    await collection.drop();
                    console.log('delete collection: ' + name);
                }

                report.players.push({
                    worldId: name.split('_')[1],
                    del: result.n, // how many deleted player
                    count: stats.count, // how many player after
                    size: stats.size,
                });
            })
        );

        /**
         * collect data for each reports collection
         */
        await Promise.all(
            reportsColl.map(async ({ name }) => {
                const collection = await db.collection(name);

                // deleting old layouts
                const { result } = await collection.remove({
                    time: { $lt: removeReportsDate },
                });
                if (!result.ok) console.log('FEHLER BEIM LÖSCHEN VON REPORTS'); // TODO save Error persistently
                // console.log(result);
                const stats = await collection.stats({
                    scale: 1024,
                });

                if (stats.count === 0) {
                    await collection.drop();
                    console.log('delete collection: ' + name);
                }

                report.reports.push({
                    worldId: name.split('_')[1],
                    del: result.n, // how many deleted player
                    count: stats.count, // how many player after
                    size: stats.size,
                });
            })
        );
        console.log(report);
        // save and return report
        const result = await report.save();
        console.log(result);
        //await db.collection('reports').save(report);
        return report;
    } catch (e) {
        // TODO proper error handling
        console.error(e.message);
        console.error(e);
    }
};
