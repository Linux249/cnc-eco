'use strict'
import mongoose, { Schema }  from 'mongoose'

const worldSchema = new Schema({
    name: String,
    players: [{type: Schema.ObjectId, ref: 'Player'}]
})

export default mongoose.model('World', worldSchema)