import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export default ({ auth, path, component: Component }) => (
    <Route
        path={path}
        render={() => (auth ? <Component /> : <Redirect to={{ pathname: '/login' }} />)}
    />
);
