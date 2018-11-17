import mongoose, { Schema } from 'mongoose';

const worldSchema = new Schema({
    worldId: { type: Number, required: true, index: true },
    worldName: { type: String, required: true, index: true },
});

export default mongoose.model('World', worldSchema);
