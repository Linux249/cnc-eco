export const AUTH_ERRORS = {
    MISS_CREDENTIALS: {
        status: 404,
        message: 'E-Mail or password are missing',
    },
    USER_NOT_EXIST: {
        status: 404,
        message: 'E-Mail not found. Please register for a new account.',
    },
    USER_ALREADY_EXIST: {
        status: 404,
        message: 'User already exists. Please login or reset password.',
    },
    WRONG_PASSWORD: {
        status: 404,
        message: 'Wrong password.',
    },
    NOT_VERIFIED: {
        status: 404,
        message: 'E-Mail not verified',
    },
};

export const ERRORS = {
    AUTH: AUTH_ERRORS,
};

export default ERRORS;
