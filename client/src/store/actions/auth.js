import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_PASSWORD,
    START_ASYNC_AUTH,
    AUTH_LOGOUT,
} from '../constants/actionTypes';
import { api_url, LOCAL_STORE } from '../../config';
import { updatePlayer } from './player';

export const requestLogin = () => {
    return async (dispatch, getState) => {
        dispatch({ type: START_ASYNC_AUTH });
        const { email, password } = getState().auth;
        const body = JSON.stringify({ email, password });
        const resp = await fetch(api_url + '/local/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body,
        }).catch(e => {
            console.warn('LOGIN FAILURE');
            console.error(e);
            return dispatch(loginError(e.message));
        });

        const data = await resp.json();
        if (!resp.ok) {
            console.warn('LOGIN FAILURE');
            return dispatch(loginError(data.err));
        }

        // store whole data locally
        localStorage.setItem(LOCAL_STORE, JSON.stringify(data));
        dispatch(receiveLogin(data));
        dispatch(updatePlayer(data.user));
    };
};

export const requestRegister = () => {
    return async (dispatch, getState) => {
        dispatch({ type: START_ASYNC_AUTH });
        const { email, password } = getState().auth;
        const body = JSON.stringify({ email, password });

        const resp = await fetch(api_url + '/local/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body,
        }).catch(e => {
            console.warn('LOGIN FAILURE');
            console.error(e);
            return dispatch(loginError(e.message));
        });

        const data = await resp.json();
        if (!resp.ok) {
            console.warn('LOGIN FAILURE');
            return dispatch(loginError(data.err));
        }

        localStorage.setItem(LOCAL_STORE, JSON.stringify(data));
        console.log(resp);
        dispatch(receiveLogin(data));
        dispatch(updatePlayer(data.user));
    };
};

export const requestResendToken = () => {
    return async (dispatch, getState) => {
        dispatch({ type: START_ASYNC_AUTH });
        // todo error if E-mail is not correct
        const { email } = getState().auth;
        const body = JSON.stringify({ email });

        const resp = await fetch(api_url + '/local/resendMailToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body,
        }).catch(e => {
            console.warn('requestResendToken FAILURE');
            console.error(e);
            return dispatch(loginError(e.message));
        });

        const data = await resp.json().catch(e => {
            console.warn('requestResendToken FAILURE');
            console.error(e);
            return dispatch(loginError(e.message));
        });

        if (!resp.ok) {
            console.warn('requestResendToken FAILURE');
            return dispatch(loginError(data.error.message));
        }

        return dispatch(loginError(data.success));
    };
};

export const requestEmail = () => {
    return async (dispatch, getState) => {
        dispatch({ type: START_ASYNC_AUTH });
        const { email } = getState().auth;
        const body = JSON.stringify({ email });

        const resp = await fetch(api_url + '/local/requestPasswordReset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body,
        }).catch(e => {
            console.warn('requestResendToken FAILURE');
            console.error(e);
            return dispatch(loginError(e.message));
        });

        const data = await resp.json().catch(e => {
            console.warn('requestResendToken FAILURE');
            console.error(e);
            return dispatch(loginError(e.message));
        });

        if (!resp.ok) {
            console.warn('requestResendToken FAILURE');
            return dispatch(loginError(data.error.message));
        }
        return dispatch(loginError(data.success));
    };
};

export const resetPassword = token => {
    return async (dispatch, getState) => {
        dispatch({ type: START_ASYNC_AUTH });
        const { password } = getState().auth;
        const body = JSON.stringify({ password, token });

        const resp = await fetch(api_url + '/local/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body,
        }).catch(e => {
            console.warn('resetPassword 1 FAILURE');
            console.error(e);
            return dispatch(loginError(e.message));
        });

        console.log(resp);
        const data = await resp.json().catch(e => {
            console.warn('resetPassword 2 FAILURE');
            console.error(e);
            return dispatch(loginError(e.message));
        });
        console.log(data);

        if (!resp.ok) {
            console.warn('resetPassword 3 FAILURE');
            return dispatch(loginError(data.error.message));
        }
        return dispatch(loginError(data.success));
    };
};

export function receiveLogin(data) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token: data.token,
        user_id: data.user._id,
        isVerified: data.user.isVerified,
    };
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message,
    };
}

export const changeAuthEmail = email => ({
    type: CHANGE_AUTH_EMAIL,
    email,
});

export const changeAuthPassword = password => ({
    type: CHANGE_AUTH_PASSWORD,
    password,
});

export const logout = () => {
    localStorage.removeItem(LOCAL_STORE);
    return {
        type: AUTH_LOGOUT,
    };
};
