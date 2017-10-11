'use strict'
import mongoose, { Schema }  from 'mongoose'

const playerSchema = new Schema({
    name: String,
    worlds: [{
        name: {type: String, default: "missing!!" }, // name of the world
        w: Number, // id of the world
        bases: [{
            name: {type: String, default: "missing!!"},
            layout: String, // only 72 as length!
        }]
    }]
})

export default mongoose.model('Player', playerSchema)