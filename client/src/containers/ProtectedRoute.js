import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export default ({ auth, path, name, component: Component }) => (
    <Route
        path={path}
        render={() =>
            auth ? (
                name || path === '/user' ? (
                    <Component />
                ) : (
                    <Redirect to="/user" />
                )
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);
