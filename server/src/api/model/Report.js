import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now }, // todo later add expires
    players: [
        {
            worldId: { type: Number },
            del: { type: Number }, // how many deleted player
            count: { type: Number }, // how many player after
            size: { type: Number },
        },
    ],

    layouts: [
        {
            worldId: { type: Number },
            del: { type: Number },
            count: { type: Number },
            size: { type: Number },
        },
    ],

    reports: [
        {
            worldId: { type: Number },
            del: { type: Number }, // how many deleted player
            count: { type: Number }, // how many player after
            size: { type: Number },
        }
    ]
});

// create the model for users and expose it to our app
export default mongoose.model('Report', reportSchema);
