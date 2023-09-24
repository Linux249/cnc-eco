if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

export const dbUri = process.env.MONGODB_URI;

export const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

/**
 * These are URL parameter used by next-aut or are custom to help telling the user what went wrong.
 */
export const ERRORS = {
    AUTH: {
        // next-auth
        VERIFICATION: 'Verification',
        EmailNotVerified: 'EmailNotVerified-used',
        UserAlreadyExist: 'UserAlreadyExist-used',
        // custom
        CredentialsSignin: 'CredentialsSignin',
        Callback: 'Callback',
    },
};
export const DEV = process.env.NODE_ENV === 'development';
export const LOCAL_STORE = DEV ? 'cnc-eco-dev2' : 'cnc-eco2';
export const API_URL = DEV
    ? 'http://localhost:8000/api/v1'
    : 'https://cnc-eco.herokuapp.com/api/v1';
