/**
 * Created by Bombassd on 08.06.2017.
 */
'use strict';
import { findBestToLvlUpNext } from './src/performance'
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    // host: 'cnc-eco.herokuapp.com',
    host: (process.env.HOST || 'localhost'),
    port: (process.env.PORT || 8000),
    routes: { cors: true }
});

// server.log(['error', 'database', 'read']);

// Add the route
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        // console.error("haloo")
        return reply("hello");
    }
});

server.route({
    method: 'POST',
    path:'/optimize',
    handler: function (request, reply) {
        const buildings = JSON.parse(request.payload)
        const best = findBestToLvlUpNext(buildings)
        return reply(best);
    }
});


let io = require('socket.io')(server.listener, {'pingInterval': 1000});
io.on('connect', function (socket) {

    console.log("someone conecceted")

    socket.on("buildings", (buildings) => {
        console.log("buildings emited - start searching")
        findBestToLvlUpNext(buildings, foundNewBest )
        // const interv = setInterval((i)=> {
        //     console.log("interval " + i)
        //     socket.emit("buildings", [ 32,16,16])
        // }, 1000)

        socket.on('disconnect', function(){
            // clearInterval(interv)
            console.log('user disconnected');
        });

        function foundNewBest(id) {
            socket.emit("buildings", id)
        }
    })

    // socket.on("buildings", (buildings) => {
    //     console.log("ON BUILDING")
    //     //
    //
    //
    // })




});


// io.on("buildings", (buildings) => {
//     console.log(buildings)
// })
// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});