import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { api_url } from '../config';
import Alert from '../style/Alert';
import urlToBase from '../util/parseurl';
import { store } from '../pages/';
import { replaceAllBase } from '../store/actions/base';

export const S = props => {
    const [err, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const { url } = props.match.params;

    async function load() {
        const item = await fetch(`${api_url}/urlToBase/${url}`)
            .then(r => r.json())
            .catch(e => {
                console.log('ERROR');
                setError(e.message);
            });
        if (item.url) {
            const base = urlToBase(
                `3|${item.faction}|` + item.faction + `|${item.name}|${item.url}`
            );
            console.log(base);
            store.dispatch(replaceAllBase(base));
            setLoaded(true);
        } else {
            setError(item.error.message);
        }
        console.log(item);
        return null;
    }

    useEffect(() => {
        !loaded && load();
    });

    return loaded ? (
        <Redirect to="/" />
    ) : (
        <div>
            <Alert>{err}</Alert>
        </div>
    );
};
