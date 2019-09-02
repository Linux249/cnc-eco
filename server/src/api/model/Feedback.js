import mongoose from 'mongoose';

/**
 * Feedback is used for collect messages from user
 */
const feedbackSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    text: String,
    read: { type: Boolean, default: false },
    votes: Number,
    voted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: { type: Date, required: true, default: Date.now },
});

// create the model for users and expose it to our app
export default mongoose.model('Feedback', feedbackSchema);
