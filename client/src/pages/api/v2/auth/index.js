import { middleware } from '../../../../lib/api/middleware';

function auth(req, res, next) {
    //res.send('a');
    next(new Error('fehler'))
}

export default middleware(auth, { db: true });
