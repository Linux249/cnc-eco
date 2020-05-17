import jwt from 'jsonwebtoken';
import { middleware } from '../../../../lib/api/middleware';
import User from '../../../../lib/api/model/User.js';
import ERRORS from '../../../../lib/api/errors';
import { JWT_SECRET } from '../../../../config/index';

async function login(req, res, next) {
    const { email, password } = req.body;

    // produce ui error message
    if (!email || !password) return next(ERRORS.AUTH.MISS_CREDENTIALS);

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) return next(ERRORS.AUTH.USER_NOT_EXIST);
        if (!user.validPassword(password)) return next(ERRORS.AUTH.WRONG_PASSWORD);
        if (!user.isVerified) return next(ERRORS.AUTH.NOT_VERIFIED);

        // all is well, return user
        const token = jwt.sign(user.getUserJWT(), JWT_SECRET);
        return res.json({ user, token });
    } catch (err) {
        return next(err);
    }
}

export default middleware(login, { db: true });
