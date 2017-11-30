//https://github.com/scotch-io/easy-node-authentication/blob/master/config/passport.js
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import {Strategy as LocalStrategy} from 'passport-local'
import {googleAuth} from "./config"

import {User} from "../model/User";

export default (passport) => {

    // serialize user.id for cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);    // .id is the mongo id
    })


    passport.deserializeUser((id, done) => {
        //id comes from cookie an is allreaddy deserialized
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                User.findOne({'local.email': email}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Wrong password.'));

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                // if the user is not already logged in:
                if (!req.user) {
                    User.findOne({'local.email': email}, function (err, user) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {

                            // create the user
                            const newUser = new User();

                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);

                            newUser.save(function (err) {
                                if (err) return done(err);
                                return done(null, newUser);
                            });
                        }

                    });
                    // if the user is logged in but has no local account...
                } else if (!req.user.local.email) {
                    // ...presumably they're trying to connect a local account
                    // BUT let's check if the email used to connect a local account is being used by another user
                    User.findOne({'local.email': email}, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                            // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                        } else {
                            const user = req.user;
                            user.local.email = email;
                            user.local.password = user.generateHash(password);
                            user.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, user);
                            });
                        }
                    });
                } else {
                    // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                    return done(null, req.user);
                }

            });

        }));


    passport.use(
        new GoogleStrategy(
            {
                clientID: googleAuth.clientID,
                clientSecret: googleAuth.clientSecret,
                callbackURL: '/api/v1/auth/google/callback',
                proxy: true, // do this only if you trust your provider!
                passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
            },
            async (req, accessToken, refreshToken, profile, done) => {
                if (!req.user) {
                    try {
                        const user = User.findOne({'google.id': profile.id})
                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.google.token) {
                                user.google.token = accessToken;
                                user.google.name = profile.displayName;
                                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                                await user.save()
                                return done(null, user);
                            }

                            return done(null, user);
                        } else {
                            // user already exists and is logged in, we have to link accounts
                            const user = req.user; // pull the user out of the session

                            user.google.id = profile.id;
                            user.google.token = accessToken;
                            user.google.name = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            await user.save()
                            return done(null, user);
                        }
                    } catch (err) {
                        return done(err)
                    }
                }
            })
    )
}
