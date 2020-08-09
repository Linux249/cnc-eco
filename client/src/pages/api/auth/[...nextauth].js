import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { sendVerificationRequest } from '../../../util/mail';

const options = {
    providers: [
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest
        }),
    ],

    // A database is optional, but required to persist accounts in a database
    database: process.env.MONGODB_URI,
    secret: process.env.JWT_SECRET,
    session: { jwt: true },
    jwt: {
        secret: process.env.JWT_SECRET,
    }
}

export default (req, res) => NextAuth(req, res, options)
