import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_PASSWORD,
    REGISTER_REQUEST,
} from '../constants/actionTypes'

export function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
    }
}

export function requestRegister() {
    return {
        type: REGISTER_REQUEST,
        isFetching: true,
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export const changeAuthEmail = (email) => ({
    type: CHANGE_AUTH_EMAIL,
    email
})

export const changeAuthPassword = (password) => ({
    type: CHANGE_AUTH_PASSWORD,
    password
})