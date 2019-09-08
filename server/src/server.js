import express from 'express';
import path from 'path';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { pingInterval: 1000 });
const api = require('./api/app');
const PORT = process.env.PORT || 8000; //: 4444;

// app.use((req, res, next) => {
//     console.log('EVERY API/V1 CALL: ' + req.url);
//     return next();
// });

// DB
// const mongo_uri = process.env.MONGODB_URI
//     ? process.env.MONGODB_URI
//     : 'mongodb://localhost:27017/cnc';
// console.log({ mongo_uri });
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
    console.log('someone connected');

    socket.on('buildings', buildings => {
        console.log('buildings emitted - start searching');
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

/** add the api to express*/
app.use('/api/v1', api);

/**
 * redicrect all to https
 * todo: this is bedder before adding the app but check out if there is a source which calls api without https first!
 */
if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy'); // thats needed for having the
    app.use(function(req, res, next) {
        if (!req.secure) {
            return res.redirect(`https://${req.get('Host')}${req.url}`);
        }
        next();
    });
}

/**
 * add the public folder for server SPA
 */
const p = path.join(__dirname, '../../client/build');
app.use('/', express.static(p));

//
// app.use("/*", express.static(__dirname + 'public'))
/*
app.use(express.static(path.join(__dirname, 'public')));
*/
// todo that is maybe useless, check logs time to time
app.use('/*', function(req, res) {
    const file = path.join(p, 'index.html');
    console.log('File loaded -route: ', req.url, '/', file);
    res.sendFile(file);
});

app.set('port', PORT);

/**
 * Listen on provided port
 */
app.listen(PORT, () => {
    console.log(`Server gestartet - Port: ${PORT}`);
});

export default app;
