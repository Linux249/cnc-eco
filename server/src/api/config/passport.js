// https://github.com/scotch-io/easy-node-authentication/blob/master/config/passport.js
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { googleAuth } from './config';
import User from '../model/User';
import { sendToken } from '../service/mail';
import Token from '../model/Token';
import generateToken from '../utils/generateToken';

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

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use(
        'local-login',
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
            },
            async (req, email, password, done) => {
                if (email) email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
                // asynchronous
                try {
                    const user = await User.findOne({ 'local.email': email });

                    // if no user is found, return the message
                    if (!user) return done(new Error('No user found - check email adress'), false);

                    if (!user.validPassword(password)) {
                        return done(new Error('Wrong password.'), false);
                    }
                    if (!user.isVerified) {
                        return done(new Error('Email not verified'), false);
                    }
                    // all is well, return user
                    return done(null, user);
                } catch (err) {
                    console.log(err);
                    return done(err);
                }
            }
        )
    );

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
            },
            (req, email, password, done) => {
                // Use lower-case e-mails to avoid case-sensitive e-mail matching
                if (email) email = email.toLowerCase();
                // console.log("inside local signup cb")

                // asynchronous
                process.nextTick(() => {
                    // if the user is not already logged in:
                    if (!req.user) {
                        User.findOne({ 'local.email': email }, async (err, user) => {
                            // console.log("no user???")
                            // console.log({err, user, email, password})
                            // console.log(password)
                            // if there are any errors, return the error
                            if (err) return done(err);

                            // check to see if theres already a user with that email
                            if (user) {
                                if (user.isVerified)
                                    return done(new Error('That email is already taken.'), false);
                                else {
                                    console.log(await User.remove(user));
                                    console.log(await Token.remove({ _userId: user.id }));
                                }
                            }
                            // create the user
                            const newUser = new User();

                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);

                            newUser.save((err, savedUser) => {
                                if (err) return done(err);
                                savedUser.local.password = undefined;
                                // const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                                const token = new Token({
                                    _userId: savedUser._id,
                                    token: generateToken(),
                                });

                                // console.log(newUser)
                                console.log(savedUser);
                                console.log(token);
                                token.save(async function(err) {
                                    if (err)
                                        return done(new Error('Token could not be saved.'), false);
                                    // Send the email
                                    await sendToken(token, savedUser.local.email);
                                });

                                return done(null, savedUser);
                            });
                        });
                        // if the user is logged in but has no local account...
                    } else if (!req.user.local.email) {
                        // ...presumably they're trying to connect a local account
                        // BUT let's check if the email used to connect a local account is being used by another user
                        User.findOne({ 'local.email': email }, (err, user) => {
                            if (err) return done(err);

                            if (user) {
                                return done(
                                    null,
                                    false,
                                    req.flash('loginMessage', 'That email is already taken.')
                                );
                                // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                            }
                            // TODO UNSTABLE test this - maybe it is new user
                            const user2 = req.user;
                            user2.local.email = email;
                            user2.local.password = user2.generateHash(password);
                            user2.save((err, savedUser) => {
                                if (err) return done(err);
                                delete savedUser.local.password;
                                return done(null, savedUser);
                            });
                        });
                    } else {
                        // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                        return done(null, req.user);
                    }
                });
            }
        )
    );

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
    );

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
