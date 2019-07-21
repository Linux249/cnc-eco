import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LOCAL_STORE } from '../config';

export default props => {
    let { auth, path, name, component } = props;
    const data = JSON.parse(localStorage.getItem(LOCAL_STORE));
    if (!auth && data) auth = !!data.token;
    if (!name && data) name = !!data.user.player;
    if (auth)
        if (name || path === '/user') return <Route path={path} component={component} />;
        else return <Redirect to="/user" />;
    else return <Redirect to="/login" />;
};
