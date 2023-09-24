import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { sendVerificationRequest } from '../../../util/mail';

import { dbUri } from '../../../lib/const';

const options = {
    providers: [
        Providers.Email({
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
            },
            server: {
                host: 'smtp.cnc-eco.de',
                port: 587,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: 'noreply@cnc-eco.de',
            sendVerificationRequest,
        }),
    ],

    // A database is optional, but required to persist accounts in a database
    database: dbUri,
    secret: process.env.JWT_SECRET,
    session: { jwt: true },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        /**
         * @param  {object} user     User object
         * @param  {object} account  Provider account
         * @param  {object} profile  Provider profile
         * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
         *                           Return `false` to deny access
         */
        /*  signIn: async (user, account, profile) => {
            // console.log('SIGN IN 1-2', user, account, profile);

            const isAllowedToSignIn = true;
            if (profile.verificationRequest) {
                return Promise.resolve(true);
            } else {
                // Return false to display a default error message
                // return Promise.resolve(false);
                // You can also Reject this callback with an Error or with a URL:
                // return Promise.reject(new Error('error message')) // Redirect to error page
                return Promise.reject('/user'); // Redirect to a URL
            }
        },*/
        // session: async (session, user) => {
        //     // console.log('SESSION', session, user);
        //     return Promise.resolve(session);
        // },
        async jwt(token, user, account, profile, isNewUser) {
            console.log('JWT', token, user, account, profile, isNewUser);
            // todo remove double save name in player later
            token.player = user?.name || null; // todo attribute player is not visible in client

            return token;
        },
        // redirect: async (url, baseUrl) => {
        //     // console.log('REDIRECT', url, baseUrl);
        //     return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
        // },
    },
    debug: true,
};

export default (req, res) => NextAuth(req, res, options);
