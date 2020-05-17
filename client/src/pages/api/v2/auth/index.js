import { middleware } from '../../../../lib/api/middleware';
import Token from '../../../../lib/api/model/Token';
import User from '../../../../lib/api/model/User';
import { sendResetPassword, sendVerification } from '../../../../lib/api/mail';

function auth(req, res, next) {
    //res.send('a');
    next(new Error('fehler'));


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
            if (!user.isVerified)
                return next(new Error('User not verified - verify your email first'));
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
}

export default middleware(auth, { db: true });
