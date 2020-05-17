import { middleware } from '../../../../lib/api/middleware';

function register(req, res, next) {
    //res.send('a');
    next(new Error('fehler'))
}

export default middleware(register, { db: true });
