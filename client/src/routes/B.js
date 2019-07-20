import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Alert from '../style/Alert';
import urlToBase from '../util/parseurl';
import { store } from '..';
import { replaceAllBase } from '../store/actions/base';

export const B = props => {
    const [err, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const { url } = props.match.params;

    function load() {
        try {
            const base = urlToBase(url);
            console.log(base);
            store.dispatch(replaceAllBase(base));
            setLoaded(true);
        } catch (e) {
            console.warn(e);
            setError('no URL');
        }
    }

    useEffect(() => {
        !loaded && load();
    });

    return loaded ? (
        <Redirect to="/" />
    ) : (
        <div>
            loading
            <Alert>{err}</Alert>
        </div>
    );
};
