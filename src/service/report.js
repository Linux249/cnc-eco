const nodemailer = require('nodemailer');



let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cncecoserver@gmail.com',    // TODO config for Login dev/prod
        pass: 'yourpassword'
    }
});

const report = {
    date: new Date(),   // current time
    server: [
        /*
        * size: MB  // DB size
         */
    ],
    worlds: [
        /* {
        * world: name,
        * deletedLayouts: count,
        * docs: count, // after delte = #layouts
        * size: MB,       // collection size
        *
         */
    ],
    player: {
        /*
        * docs: count // count docs
        * size: MB //size of collection,
        * newestPlayer: [{ playername , worlds }]
         */
    }

}

let mailOptions = {
    from: 'cncecoserver@gmail.com',
    to: 'julian.libor@gmail.com',
    subject: 'CnCEco Web-Server status',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

export const createReport = async (db) => {
    'use strict'
    let date = new Date()
    date.setDate(date.getDate() - 14)   // date 14 days before now

    try {
        // collections for the layouts
        const collections = await db.listCollections().toArray()
        const layoutsColl = collections.filter(coll => coll.name.includes("layouts"))
        console.log(layoutsColl)

        // got throug each World/collection
        await Promise.all(layoutsColl.map(async ({name}) => {
            const collection = await db.collection(name)
            const reportWorld = {
                name: name,
                deletedLayouts: null,
                stats: null
            }


            // deleting old layouts

            const { result } = await collection.remove({time: {$lt: date}})
            if(!result.ok) console.log("FEHLER BEIM LÖSCHEN VON LAYOUTS")       // TODO bedder error handling
            reportWorld.deletedLayouts = result.n

            // getting db stats
            reportWorld.stats = await collection.stats()

            report.worlds.push(reportWorld)



        }))

        // save report
        await db.collection('reports').save(report)

        console.log(report)



    } catch(e) {
        // TODO proper error handling
        console.error(e.message)
        console.error(e)
    }


}

