'use strict'
import mongoose, { Schema }  from 'mongoose'

const playerSchema = new Schema({
    name: String,
    worlds: [{
        name: String,
        layouts: {type: Schema.ObjectId, ref: 'layouts'},
    }]
})

export default mongoose.model('Player', playerSchema)