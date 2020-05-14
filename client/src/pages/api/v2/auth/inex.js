import { middleware } from '../../../../util/api';

function auth(req, res, next) {

    res.send('');
};

export default middleware(auth)
