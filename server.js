/**
 * Created by Bombassd on 08.06.2017.
 */
'use strict';
import { findBestToLvlUpNext } from './src/performance'
import Path from 'path'
import Inert from 'inert'
import Hapi from 'hapi'
const mongoose = require("mongoose")

// DB
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true, promiseLibrary: global.Promise })
const db = mongoose.connection //simplification

//falls Fehler kommen so ausgeben
db.on("error", (err) => {
	console.error("Fehler von DB:", err)
})

//nach erfolgreichem verbinden
db.once("open", () => {
	console.log("db connection succesful")
})


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    // host: 'cnc-eco.herokuapp.com',
    // host: (process.env.HOST || 'localhost'),
    port: (process.env.PORT || 8000),
    routes: {
        cors: true,
        files: {
            relativeTo: Path.join(__dirname, 'cnc-eco')
        }
    }
});

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: "."
        }
    }
});
// server.log(['error', 'database', 'read']);

// Add the route
// server.route({
//     method: 'GET',
//     path:'/',
//     handler: function (request, reply) {
//         // console.error("haloo")
//         return reply("hello");
//     }
// });

server.route({
    method: 'POST',
    path:'/optimize',
    handler: function (request, reply) {
        const buildings = JSON.parse(request.payload)
        const best = findBestToLvlUpNext(buildings)
        return reply(best);
    }
});

server.route({
    method: 'POST',
    path:'/layout',
    handler: function (request, reply) {
        const layouts = JSON.parse(request.payload)
        console.log(layouts)
        return reply(layouts);
    }
});

server.route({
    method: 'GET',
    path:'/layout',
    handler: function (request, reply) {

        return reply("Hallo World");
    }
});

let io = require('socket.io')(server.listener, {'pingInterval': 1000});
io.on('connect', function (socket) {

    console.log("someone conecceted")

    socket.on("buildings", (buildings) => {
        console.log("buildings emited - start searching")
        findBestToLvlUpNext(buildings, foundNewBest)

        socket.on('disconnect', function(){
            // clearInterval(interv)
            console.log('user disconnected');
        });

        function foundNewBest(id) {
            socket.emit("buildings", id)

        }
    })

});


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
