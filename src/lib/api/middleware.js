// protect routes with user authentication

import jwt from 'next-auth/jwt';
import { connectDB } from './db';

let db;

/**
 * not a real express next but its work great that way to handle errors
 * @param res
 * @return {function(*=): *}
 */
const next = (res) => (err) => res.json(err);

export const middleware = (handler) => async (req, res) => {
    console.log('API:   ', req.method, req.url, req.query, req.body);
    try {
        if (!db) db = await connectDB();
        req.db = db;
    } catch (e) {
        return next(res)({
            status: e.status || 666,
            message: e.message || 'unhandled error',
            error: e,
        });
    }
    return handler(req, res, next(res));
};

export const getUser = async (req) => await jwt.getToken({ req, secret: process.env.JWT_SECRET });

export const authMiddleware = (handler) => async (req, res) => {
    const token = await getUser(req);
        console.log('api:authMiddleware',token);
    if (token) {
        req.user = token;
        return handler(req, res);
    } else {
        // todo Not Signed in
        return res.redirect(401, '/login');
    }
};
export default middleware;
