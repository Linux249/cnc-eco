import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { replaceAllBase } from '../../store/actions/base';
import Alert from '../../style/Alert';
import urlToBase from '../../util/parseurl';
export function S() {
    const [err, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const { url } = router.query;

    async function load() {
        const item = await fetch(`${API_URL}/urlToBase/${url}`)
            .then(r => r.json())
            .catch(e => {
                console.log('ERROR', e);
                setError(e.message || 'Error URL');
            });
        if (item?.url) {
            const base = urlToBase(
                `3|${item.faction}|` + item.faction + `|${item.name}|${item.url}`
            );
            console.log(base);
            store.dispatch(replaceAllBase(base));
            setLoaded(true);
            Router.push('/');
        } else {
            setError(item?.error.message || 'CRASH');
        }
        return null;
    }

    useEffect(() => {
        !loaded && load();
    }, []);

    return (
        <div>
            {!loaded && <Alert>loading</Alert>}
            <Alert>{err}</Alert>
        </div>
    );
}

import { store } from '../old_app';

import { API_URL } from "../../lib/const";

export default S;
