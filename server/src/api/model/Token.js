import mongoose from 'mongoose';
import generateToken from '../utils/generateToken';

/**
 * token types:
 * - name: for adding the ingame name to user - deleted auto
 * - email: for verifying email, deleted after usage or auto
 * - reset: for verifying email, deleted after usage or auto
 */
const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: {type: String, enum: ['name', 'mail', 'reset']},
    token: { type: String, required: true, default: generateToken(), unique: true },
    name: String,
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

// create the model for users and expose it to our app
export default mongoose.model('Token', tokenSchema);
