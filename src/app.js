'use strict'

const express = require('express')
//const logger = require("morgan")
const jsonParser = require("body-parser").json
//const mongoose = require("mongoose")
import apiRouter from "./routes/index"
//const config = require('./env.json')[process.env.NODE_ENV || 'development']


/*import test from './test/Literatur'
test()*/

//const putMillionEntrys = require('./test')
//putMillionEntrys(10000000)


// Create the express app
const app = express()


//zeigt verschiedene logs in der Console an
//app.use(logger("dev"))
//nutzt den body parser
app.use(jsonParser())

//die Verbindung wird async aufgebaut, allerdings 'speichert' mongoose anfragen falls die app schneller läuft und Anfragen bekommt als die Verbindugn zur DB aufgebaut wird.


// DB cleaner thats delete old layouts


//falls Fehler kommen so ausgeben
// db.on("error", (err) => {
//     console.error("Fehler von DB:", err)
// })
//
// //nach erfolgreichem verbinden
// db.once("open", () => {
//     console.log("db connection succesful")
// })


// Drop database
// db.dropDatabase(function(err, result) {console.log(err + result)});
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
