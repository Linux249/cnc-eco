import { middleware } from '../../../../lib/api/middleware';
import User from '../../../../lib/api/model/User';
import ERRORS from '../../../../lib/api/errors';

/**
 * GET, [ALL]
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 */
async function verify(req, res, next) {
    const { token } = req.query;
    if (!token) return next(ERRORS.AUTH.EMAIL_TOKEN_MISSING);

    try {
        // Find a matching token
        const user = await User.findOne({ 'token.mail.token': token });

        if (!user) return next(ERRORS.AUTH.TOKEN_INVALID);

        // reset to set user valid
        user.token.mail = {};
        const savedUser = await user.save();

        console.log(savedUser, user);

        res.status(200).redirect('http://www.cnc-eco.de/login');
    } catch (e) {
        return next(e);
    }
}

export default middleware(verify, { db: true });
