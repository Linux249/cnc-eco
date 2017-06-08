/**
 * Created by Bombassd on 08.06.2017.
 */
'use strict';
import { findBestToLvlUpNext } from './src/performance'
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: (process.env.PORT || 5000),
    routes: { cors: false }
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



// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});