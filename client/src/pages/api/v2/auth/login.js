import { middleware } from '../../../../lib/api/middleware';

function login(req, res, next) {
    //res.send('a');
    next(new Error('fehler'))
}

export default middleware(login, { db: true });
