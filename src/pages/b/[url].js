import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import urlToBase from '../../util/parseurl';
import { store } from '../_app';
import { replaceAllBase } from '../../store/actions/base';
import Alert from '../../style/Alert';
import Body from '@/style/Body';

import { API_URL } from "../../lib/const";

export function B() {
    const [err, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const { url } = router.query;

    async function load() {
        console.log('Init URL to base', url, router);
        if (!url) return;
        try {
            const base = urlToBase(url);
            store.dispatch(replaceAllBase(base));
            try {
                const elements = url.split('|');
                const body = {
                    url: elements[4],
                    faction: elements[1],
                    name: elements[3],
                };
                try {
                    await Router.push('/');

                    // Post base to short url server and get Url - currently useless
                    const data = await fetch(API_URL + '/baseToUrl', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                        body: JSON.stringify(body),
                    }).then(r => r.json());
                    console.log(data);
                    setLoaded(true);
                } catch (e) {
                    console.warn('failed to ', e);
                    setError(e.message);
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
        if (url) load().then();
    }, [url]);

    return (
        <Body>
            <div />
            <div>
                {!loaded && <Alert>loading</Alert>}
                <Alert>{err}</Alert>
            </div>
            <div />
        </Body>
    );
}

export default B;
