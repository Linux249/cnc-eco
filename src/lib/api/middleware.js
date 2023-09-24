// protect routes with user authentication

import jwt from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import {authOptions} from "../authOptions";


export const getUser = async (req) => await jwt.getToken({ req, secret: process.env.JWT_SECRET });

export const authMiddleware = (handler) => async (req, res) => {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        req.user = token;
        return handler(req, res);
    } else {
        return res.redirect(401, '/login');
    }
};
