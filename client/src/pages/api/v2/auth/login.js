import jwt from 'jsonwebtoken';
import { middleware } from '../../../../lib/api/middleware';
import User from '../../../../lib/api/model/User.js';
import ERRORS from '../../../../lib/api/errors';

async function login(req, res, next) {
    if (req.method !== 'POST') return next(ERRORS.API.WRONG_METHOD);
    const { email, password } = req.body;

    // produce ui error message
    if (!email || !password) return next(ERRORS.AUTH.MISS_CREDENTIALS);

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) return next(ERRORS.AUTH.USER_NOT_EXIST);
        if (!user.validPassword(password)) return next(ERRORS.AUTH.WRONG_PASSWORD);
        if (user.token.mail?.token) return next(ERRORS.AUTH.NOT_VERIFIED);

        // all is well, return user
        const token = jwt.sign(user.getUserJWT(), process.env.JWT_SECRET);
        return res.json({ user, token });
    } catch (err) {
        return next(err);
    }
}

export default middleware(login, { db: true });
