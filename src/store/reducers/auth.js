import {CHANGE_AUTH_EMAIL, CHANGE_AUTH_PASSWORD} from '../constants/actionTypes'

const initState = {
    email: '',
    password: '',
    isFetching: false,
    isAuthenticated: false, // TODO check here for localStorage?
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
        default:
            return state
    }
}