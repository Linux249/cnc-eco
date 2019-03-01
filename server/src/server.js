/**
 * Created by Bombassd on 08.06.2017.
 */

import express from 'express';
import path from 'path';
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { pingInterval: 1000 });
const api = require('./app');

const PORT = process.env.PORT || 8000;

// DB
const mongo_uri = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017/cnc';
console.log({ mongo_uri });
// mongoose.connect(mongo_uri, { useMongoClient: true, promiseLibrary: global.Promise })
// const db = mongoose.connection //simplification

// app.use("/", express.static("public"))

//
//
// server.register(Inert, () => {});
//
//
// server.route({
//     method: 'POST',
//     path:'/optimize',
//     handler: function (request, reply) {
//         const buildings = JSON.parse(request.payload)
//         const best = findBestToLvlUpNext(buildings)
//         return reply(best);
//     }
// });
//
// server.route(layouts);

io.on('connect', socket => {
    console.log('someone conecceted');

    socket.on('buildings', buildings => {
        console.log('buildings emited - start searching');
        // findBestToLvlUpNext(buildings, foundNewBest)

        socket.on('disconnect', () => {
            // clearInterval(interv)
            console.log('user disconnected');
        });

        function foundNewBest(id) {
            socket.emit('buildings', id);
        }
    });
});

app.use('/api/v1', api);
// Start the server
// server.start((err) => {
//
//     if (err) {
//         throw err;
//     }
//     console.log('Server running at:', server.info.uri);
// });

/**
 * add the public folder
 */
const p = path.join(__dirname, '../../client/build');
//console.log({path})
app.use('/', express.static(p));


//
// app.use("/*", express.static(__dirname + 'public'))
/*
app.use(express.static(path.join(__dirname, 'public')));
*/

app.use('/*', function (req, res) {
    const file = path.join(p, 'index.html')
    console.log(req.url)
    console.log(file)
    res.sendFile(file);
});


app.set('port', PORT);

/**
 * Listen on provided port
 */
app.listen(PORT, () => {
    console.log(`Server gestartet - Port: ${PORT}`);
});
