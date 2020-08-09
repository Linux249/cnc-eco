import jwt from 'jsonwebtoken';
import { sendVerification } from '../../../../lib/api/mail';
import { middleware } from '../../../../lib/api/middleware';
import User from '../../../../lib/api/model/User';
import ERRORS from '../../../../lib/api/errors';

async function register(req, res, next) {
    if (req.method !== 'POST') return next(ERRORS.API.WRONG_METHOD);

    let { email, password } = req.body;

    // produce ui error message
    if (!email || !password) return next(ERRORS.AUTH.MISS_CREDENTIALS);

    // Use lower-case e-mails to avoid case-sensitive e-mail matching
    email = email.toLowerCase();

    try {
        const user = await User.findOne({ email: email });

        // if user exist and is verified
        if (user && !user.token.mail?.token) return next(ERRORS.USER_ALREADY_EXIST);
        // if existing user is not verified, just delete him
        if (user) await User.remove(user);

        // use old (overwrite) or create new user
        const newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);

        const savedUser = await newUser.save();

        // Send the email to user
        await sendVerification(savedUser.token.mail, savedUser.local.email);

        const token = jwt.sign(user.getUserJWT(), process.env.JWT_SECRET);

        return res.json({ user, token });
    } catch (e) {
        return next(e);
    }
}

export default middleware(register, { db: true });
