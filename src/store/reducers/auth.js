import {
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_PASSWORD,
    END_ASYNC_AUTH, LOGIN_FAILURE,
    LOGIN_SUCCESS,
    START_ASYNC_AUTH
} from '../constants/actionTypes'

const initState = {
    email: '',
    password: '',
    isFetching: false,
    isAuthenticated: false, // TODO check here for localStorage?
    token: null,
    error: null
}

export function auth(state = initState, action) {
    switch (action.type) {
        case CHANGE_AUTH_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case CHANGE_AUTH_PASSWORD:
            return {
                ...state,
                password: action.password
            }
        case START_ASYNC_AUTH:
            return {
                ...state,
                isFetching: true
            }
        case END_ASYNC_AUTH:
            return {
                ...state,
                isFetching: false
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                token: action.token,
                error: null
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                token: null,
                error: action.message

            }
        default:
            return state
    }
}