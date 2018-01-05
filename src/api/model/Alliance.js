'use strict'
import mongoose, { Schema }  from 'mongoose'

const allianceSchema = new Schema({
    name: String,
    worlds: [{
        name: {type: String, required: true }, // name of the world
        w: {type: Number, required: true}, // id of the world
        bases: [{
            name: {type: String, default: "missing!!"},
            layout: String  // only 72 as length!
        }],
        date: {type: Date, default: Date.now}
    }]
})

export default mongoose.model('Alliance', allianceSchema)