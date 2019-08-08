import generateToken from '../../utils/generateToken';
import Token from '../../model/Token';
import User from '../../model/User';
import { sendResetPassword, sendVerification } from '../../service/mail';
const jwt = require('jsonwebtoken');

module.exports = function(app, passport) {
    // LOGOUT ==============================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // process the login form
    app.post('/local/login', (req, res, next) => {
        passport.authenticate('local-login', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'No user found - no info?',
                    user,
                    err: err && err.message,
                    info,
                });
            }
            req.login(user, { session: false }, err => {
                if (err) {
                    res.send(err);
                }
                // generate a signed son web token with the contents of user object and return it in the response
                const secret = process.env.JWT_SECRET || 'dummy1234556';
                const token = jwt.sign(user.toJSON(), secret);
                return res.json({ user, token });
            });
        })(req, res);
    });

    // SIGN UP =============================================
    app.post('/local/signup', (req, res, next) => {
        passport.authenticate('local-signup', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Fehler beim user erstellen',
                    user,
                    err: err && err.message,
                    info,
                });
            }
            req.login(user, { session: false }, err => {
                if (err) return next(err);
                // console.log(user)
                // generate a signed son web token with the contents of user object and return it in the response
                const secret = process.env.JWT_SECRET || 'dummy1234556';
                console.log({ user });
                const token = jwt.sign(user.toJSON(), secret);
                return res.json({ user, token });
            });
        })(req, res);
    });

    // VERIFY MAIL ============================================
    app.get('/local/verify', async (req, res, next) => {
        console.log('VERIFY');
        const { token } = req.query;
        if (!token) return next(new Error('Token missing'));

        try {
            // Find a matching token
            const tok = await Token.findOne({ token, type: 'mail' });
            console.log(tok);
            if (!tok)
                return next(
                    new Error(
                        'Unable to find a valid token.\nYour token my have expired or used already.'
                    )
                );
            // If we found a token, find a matching user
            const user = User.findOne({ _id: tok._userId });
            if (!user) return next(new Error('Unable to find a user for this token.'));
            if (user.isVerified) return next(new Error('User has already been verified.'));
            console.log(user)
            // Verify and save the user
            user.isVerified = true;
            await user.save();
            res.status(200).redirect('http://www.cnc-eco.de/login');
        } catch (e) {
            return next(e);
        }
    });

    // GET NEW VERIFY MAIL TOKEN =========================
    app.post('/local/resendMailToken', async (req, res, next) => {
        console.log('resendMailToken');
        const { email } = req.body;
        if (!email) return next(new Error('Email missing'));

        const user = await User.findOne({ 'local.email': email }).catch(e => next(e)); // todo log error persistent
        console.log(email, user);
        if (!user) return next(new Error('Unable to find a user with that email.'));
        if (user.isVerified) return next(new Error('User has already been verified.'));

        // Create a verification token, save it, and send email
        const token =
            (await Token.findOne({
                _userId: user._id,
                type: 'mail',
            })) ||
            new Token({
                _userId: user._id,
                type: 'mail',
            });

        // console.log(newUser)
        await token.save(async function(err) {
            if (err) return next(err); // todo log error persistent
            // Send the email
            await sendVerification(token, user.local.email);
            return res.json({ success: 'New mail send' });
        });
    });

    // REQUEST RESET PASSWORD MAIL ==========================
    app.post('/local/requestPasswordReset', async (req, res, next) => {
        console.log('request password reset mail');
        const { email } = req.body;
        if (!email) return next(new Error('Email missing'));

        // get user for this Email
        try {
            const user = await User.findOne({ 'local.email': email });
            if (!user) return next(new Error('No user found - incorrect email'));
            if (!user.isVerified) return next(new Error('User not verified - verify your email first'));
            const token = new Token({
                _userId: user._id,
                type: 'reset',
            });
            console.log(token);
            await token.save();
            // Send the email
            await sendResetPassword(token, user.local.email);
            return res.json({
                success: 'E-Mail with link send',
                text: 'Please check your spam folder',
            });
        } catch (e) {
            next(e);
        }
        // check if token already exists or create new onw
    });

    // RESET PASSWORD ==========================
    app.post('/local/resetPassword', async (req, res, next) => {
        console.log('resetPassword');
        const { token, password } = req.body;
        if (!token) return next(new Error('token missing'));
        if (!password) return next(new Error('enter a new password first'));

        // get user for this Email
        try {
            const tok = await Token.findOne({ token, type: 'reset' });
            if (!tok) return next(new Error('cannot find token - please request new email'));
            const user = await User.findOne({ _id: tok._userId });
            if (!user) return next(new Error('cannot find user'));

            user.local.password = user.generateHash(password);
            user.save(async function(err) {
                if (err) return next(new Error('password could not be saved.'));
                await Token.remove({ token, type: 'reset' });
                return res.json({ success: 'password reset' });
            });
        } catch (e) {
            return next(e);
        }
    });
    // SIGNUP =================================
    // show the signup form
    /* app.get('/local/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    */

    // process the signup form
    /* app.post('/local/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        session: false,
        failureFlash : true // allow flash messages
    })); */

    /*
    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    */

    /*
    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    */

    // google ---------------------------------

    // send to google to do the authentication
    // app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    /*
    app.get(
        '/auth/google/callback',
        passport.authenticate('google', {
            // successRedirect : '/#/profile?token=',
            failureRedirect: '/',
            session: false,
        }),
        (req, res) => {
            const token = 'tooookeeeen';
            res.redirect(`/#/profile?token=${token}`);
        }
    );
    */

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    /*
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    */

    /*
    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope : ['public_profile', 'email'] }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    */
    /*
    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    */

    // google ---------------------------------

    // send to google to do the authentication
    // app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

    // the callback after google has authorized the user
    /*
    app.get(
        '/connect/google/callback',
        passport.authorize('google', {
            successRedirect: '/profile',
            failureRedirect: '/',
        })
    );
     */

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, (req, res) => {
        const user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(err => {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, (req, res) => {
        const user = req.user;
        user.facebook.token = undefined;
        user.save(err => {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, (req, res) => {
        const user = req.user;
        user.twitter.token = undefined;
        user.save(err => {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, (req, res) => {
        const user = req.user;
        user.google.token = undefined;
        user.save(err => {
            res.redirect('/profile');
        });
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}
