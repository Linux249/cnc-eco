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
    EMAIL_TOKEN_MISSING: {
        status: 404,
        message: 'E-Mail verification failed. Token missing',
    },
    TOKEN_INVALID: {
        status: 404,
        message: 'Token validation failed. Get a new token please.',
    },
};

export const API_ERRORS = {
    WRONG_METHOD: {
        status: 404,
        message: 'wrong http method',
    },
}

export const ERRORS = {
    AUTH: AUTH_ERRORS,
    API: API_ERRORS,
};

export default ERRORS;
