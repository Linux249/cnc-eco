import mongoose, { Schema } from 'mongoose';

const allianceSchema = new Schema({
    allianceId: { type: Number, unique: true },
    name: String,
    count: Number,
    members: [
        {
            name: String,
            role: String,
            playerId: Number,
        },
    ],
    date: { type: Date, default: Date.now },
});

export default mongoose.models.Alliance || mongoose.model('Alliance', allianceSchema);
