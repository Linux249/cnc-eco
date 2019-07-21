import {
    AUTH_LOGOUT,
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_PASSWORD,
    END_ASYNC_AUTH,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    START_ASYNC_AUTH,
} from '../constants/actionTypes';

const initState = {
    email: process.env.NODE_ENV === 'development' ? 'julian.libor@gmail.com' : '',
    password: process.env.NODE_ENV === 'development' ? 'test123' : '',
    isFetching: false,
    isAuthenticated: false, // TODO check here for localStorage?
    token: null,
    user_id: null,
    error: null,
    isVerified: false,
};

export function auth(state = initState, action) {
    switch (action.type) {
        case CHANGE_AUTH_EMAIL:
            return {
                ...state,
                email: action.email,
            };
        case CHANGE_AUTH_PASSWORD:
            return {
                ...state,
                password: action.password,
            };
        case START_ASYNC_AUTH:
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        case END_ASYNC_AUTH:
            return {
                ...state,
                isFetching: false,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                token: action.token,
                user_id: action.user_id,
                isVerified: action.isVerified,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                token: null,
                error: action.message,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user_id: null,
                isVerified: false,
            };
        default:
            return state;
    }
}
