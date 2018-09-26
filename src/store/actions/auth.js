import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_PASSWORD,
    START_ASYNC_AUTH,
    END_ASYNC_AUTH,
} from '../constants/actionTypes'
import {api_url} from '../../config/config'


export function requestLogin() {
    return async (dispatch, getState) => {
        dispatch({type: START_ASYNC_AUTH})
        const { email, password } = getState().auth
        const body = JSON.stringify({email, password})
        const resp = await fetch(api_url + '/local/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body
        })
        console.log(resp)

    }
}

export function requestRegister() {
    return async (dispatch, getState) => {
        dispatch({type: START_ASYNC_AUTH})
        const { email, password } = getState().auth
        await fetch('/api')
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