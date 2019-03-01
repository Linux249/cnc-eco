import React, { useState, useEffect } from 'react';
import Error from '../style/Error';
import urlToBase from '../util/parseurl';
import { store } from '..';
import { replaceAllBase } from '../store/actions/base';
import { Redirect } from 'react-router';

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
            <Error>{err}</Error>
        </div>
    );
};
