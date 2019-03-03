import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LOCAL_STORE } from '../config';

export default ({ auth, path, name, component: Component }) => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORE))
    if(!auth && data) auth = !!data.token
    if(!name && data) name = !!data.user.player
    return (
        <Route
            path={path}
            render={() =>
                auth ? (
                    name || (path === '/user') ? (
                        <Component />
                    ) : (
                        // if no user is set but auth allready
                        <Redirect to="/user" />
                    )
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}
