'use strict'

const express = require('express')
//const logger = require("morgan")
const bodyParser = require("body-parser")
//const mongoose = require("mongoose")
import apiRouter from "./routes/index"
//const config = require('./env.json')[process.env.NODE_ENV || 'development']
import MongoClient from 'mongodb'

const mongo_uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/cnc"

let DB

MongoClient.connect(mongo_uri, (err, db) => {
    DB = db
})




// Create the express app
const app = express()


app.use((req, res, next) => {
    req.db = DB
    next()
})
//const allow = procces.env.

app.use((req, res, next) => {

    // Website you wish to allow to connect
    // DEV
    res.setHeader('Access-Control-Allow-Origin', 'https://prodgame08.alliances.commandandconquer.com')
    //res.setHeader('Access-Control-Allow-Origin', 'https://prodgame08.alliances.commandandconquer.com/')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH,DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})


//zeigt verschiedene logs in der Console an
//app.use(logger("dev"))
//nutzt den body parser
app.use(bodyParser.json())
app.use(bodyParser.text())

// set router for the API
app.use("/", apiRouter)


//wenn der Request bis hierhin nicht 'abgefangen' wurde:
//Eigener Error handler der errors als json! zurück schickt.
app.use((req, res, next) => {
    const message = `link nicht gültig -: ${req.url}`
    const err = new Error(message)
    err.status = 404
    next(err)
})

//Error Handler - Server error
app.use((err, req, res, next) => {
    res.status(err.status || 500)  //falls irgendwo? next(err) aufgerufne wurde hat es wie oben eine status bekommen
    res.json({
        error: {
            message: err.message
        }
    })
})



module.exports = app
