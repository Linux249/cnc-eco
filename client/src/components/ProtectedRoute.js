import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LOCAL_STORE } from '../config';

const ProtectedRoute = props => {
    let { auth, name, component: Component, ...rest } = props;
    const data = JSON.parse(localStorage.getItem(LOCAL_STORE));
    if (!auth && data) auth = data.token && data.user.isVerified;
    if (!name && data) name = !!data.user.player;
    return (
        <Route
            {...rest}
            render={props =>
                auth ? (
                    name || rest.path === '/user' ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/user" />
                    )
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
