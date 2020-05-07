import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import urlToBase from '../../util/parseurl';
import { store } from '../_app';
import { replaceAllBase } from '../../store/actions/base';
import { api_url } from '../../config';
import Alert from '../../style/Alert';
import Body from '../../style/Body';

export function B() {
    const [err, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const { url } = router.query;

    async function load() {
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
