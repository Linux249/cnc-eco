import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_PASSWORD,
} from '../constants/actionTypes'

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
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