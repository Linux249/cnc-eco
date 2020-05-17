// https://github.com/scotch-io/easy-node-authentication/blob/master/config/passport.js
import User from '../../../../client/src/lib/api/model/User';

const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default passport => {
    // serialize user.id for cookie
    /* passport.serializeUser((user, done) => {
        done(null, user.id);    // .id is the mongo id
    })


    passport.deserializeUser((id, done) => {
        //id comes from cookie an is allreaddy deserialized
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
    */

    /*
    passport.use(
        new GoogleStrategy(
            {
                clientID: googleAuth.clientID,
                clientSecret: googleAuth.clientSecret,
                callbackURL: '/api/v1/auth/google/callback',
                proxy: true, // do this only if you trust your provider!
                passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
            },
            async (req, accessToken, refreshToken, profile, done) => {
                try {
                    if (!req.user) {
                        const user = await User.findOne({ 'google.id': profile.id });
                        if (user) {
                            console.log(user);
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.google.token) {
                                user.google.token = accessToken;
                                user.google.name = profile.displayName;
                                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                                await user.save();
                                return done(null, user);
                            }

                            return done(null, user);
                        }
                        console.log('neuer user');
                        const newUser = new User();

                        newUser.google.id = profile.id;
                        newUser.google.token = accessToken;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        await newUser.save();
                        return done(null, newUser);
                    }
                    // user already exists and is logged in, we have to link accounts
                    const { user } = req; // pull the user out of the session

                    user.google.id = profile.id;
                    user.google.token = accessToken;
                    user.google.name = profile.displayName;
                    user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                    await user.save();
                    return done(null, user);
                } catch (err) {
                    console.log(err);
                    return done(err);
                }
            }
        )
    )
    */

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET || 'dummy1234556',
            },
            // SECURE CHECK check user in db prevents for sending false payload
            (jwtPayload, done) =>
                User.findById(jwtPayload._id)
                    .then(user => done(null, user))
                    .catch(err => done(err))
        )
    );
};
