import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = Schema({
    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
    player: { type: String, index: true, unique: true, sparse: true },
    playerAdded: { type: Date },
    worlds: [
        {
            worldId: String,
            player_id: Schema.ObjectId,
        },
    ],
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
export const User = mongoose.model('User', userSchema);
