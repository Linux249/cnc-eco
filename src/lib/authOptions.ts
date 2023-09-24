import {sendVerificationRequest} from "@/util/mail";
import {dbUri, JWT_SECRET} from "@/lib/const";
import EmailProvider from "next-auth/providers/email"
import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next"
import type {NextAuthOptions as NextAuthConfig} from "next-auth"
import {getServerSession} from "next-auth"
import log from "./logger";
import clientPromise from "@/lib/api/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { ERRORS } from "@/lib/const/errors";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
    interface JWT {
        /** The user's role. */
        userRole?: "admin"
    }
}

export const authOptions = {
    session: {
        strategy: "jwt"
    },
    debug: true,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        EmailProvider({
            // credentials: {
            //     username: {label: 'Username', type: 'text', placeholder: 'jsmith'},
            // },
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
    callbacks: {
        /**
         * If called by the CredentialsProvider the authorized method will be called before!
         * @param params
         */
        async signIn(params) {
            const { profile, email, credentials } = params;
            // const user = params.user ? (params.user as User) : undefined;
            const user = params.user ? params.user : undefined;
            log.auth("signIn", user, email, credentials);

            /**
             * the e-mail provider has an email object with a verificationRequest property set to true on the first login
             * docs: https://next-auth.js.org/configuration/callbacks#sign-in-callback
             */
            if (email?.verificationRequest) {
                // log.auth("email:signIn:verificationRequest", params);
                return true;
            }
            // default
            return true;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        session: async ({ session, token, user }) => {
            // todo maybe add infos from user/token to session?
            // https://next-auth.js.org/tutorials/role-based-login-strategy
            log.auth("session", { session, token, user });
            session.user = {
                // @ts-ignore
                id: token.id,
                // @ts-ignore
                userId: token.sub,
                // @ts-ignore
                role: token.role,
                ...session.user,
            };
            return session;
        },
        async jwt(params) {
            const { token, account, profile, isNewUser, user } = params;
            // const user = params.user ? (params.user as User) : undefined;
            // log.auth("jwt", { token, user, account, profile, isNewUser });
            // if (user) {
            //     if (!user.organizerId) throw new Error("User has no organizerId");
            //     token.id = user.id;
            //     token.role = user.role;
            //     token.organizerId = user.organizerId;
            // }
            // return token;
            console.log('JWT', token, user, account, profile, isNewUser);
            // todo remove double save name in player later
            token.player = user?.name || null; // todo attribute player is not visible in client
            return token;
        },

    },
    logger: {
        error(code, metadata) {
            log.error(code, metadata);
        },
        warn(code) {
            log.warn(code);
        },
        debug(code, metadata) {
            log.auth(code, metadata);
        },
    },
}  satisfies NextAuthConfig;


// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}

// We recommend doing your own environment variable validation
declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            NEXTAUTH_SECRET: string
        }
    }
}
