import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import generateToken from '../../../util/generateToken';

const userSchema = Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: {
        type: {type: String, enum: ['name', 'mail', 'reset']},
        token: { type: String, required: true, default: generateToken, unique: true },
        name: String,
        createdAt: { type: Date, required: true, default: Date.now},
    },
    player: {
        type: String,
        index: true,
        unique: true,
        sparse: true,
    },
    playerAdded: { type: Date },
    worlds: [
        {
            worldId: { type: Number, required: true },
            player_id: Schema.ObjectId,
            playerId: { type: Number, required: true },
            worldName: { type: String, required: true },
            allianceId: { type: Number, required: true },
        },
    ],
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['player', 'admin'], default: 'player' },
});

// generating a hash
userSchema.methods.generateHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// helper for jwt
userSchema.methods.getUserJWT = function() {
    return {
        id: this._id,
        player: this.player,
        worlds: this.worlds,
        isVerified: this.isVerified,
        role: this.role,
    }
};

// create the model for users and expose it to our app
export default mongoose.models.User || mongoose.model('User', userSchema);
