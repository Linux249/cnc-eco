import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Alert from '../style/Alert';
import urlToBase from '../util/parseurl';
import { store } from '..';
import { replaceAllBase } from '../store/actions/base';
import { api_url } from '../config';
import Body from '../style/Body';

export const B = props => {
    const [err, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const { url } = props.match.params;

    async function load() {
        try {
            const base = urlToBase(url);
            // console.log(base);
            store.dispatch(replaceAllBase(base));
            try {
                const elements = url.split('|');
                const body = {
                    url: elements[4],
                    faction: elements[1],
                    name: elements[3],
                };
                // Post base to short url server and get Url
                try {
                    const data = await fetch(api_url + '/baseToUrl', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                        body: JSON.stringify(body),
                    }).then(r => r.json());

                    console.log(data);
                    setLoaded(true);
                } catch (e) {
                    setError(e);
                }
            } catch (e) {
                console.warn(e);
                setError('no valid url');
            }
        } catch (e) {
            console.warn(e);
            setError('no valid url');
        }
    }

    useEffect(() => {
        load();
    }, []);

    return loaded && false ? (
        <Redirect to="/" />
    ) : (
        <Body>
            <div />
            <div>
                <Alert>loading</Alert>
                <Alert>{err}</Alert>
            </div>
            <div />
        </Body>
    );
};
