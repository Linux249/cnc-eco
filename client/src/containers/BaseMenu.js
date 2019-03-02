import React, { useState } from 'react';
import Button from '../style/Button';
import { store } from '../index';
import { api_url } from '../config';
import Error from '../style/Error';
import { replaceBuilding } from '../store/actions/base';

export function BaseMenu() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function handleClick() {
        console.log('get performance/base');
        // console.log(store)
        const { base, auth } = store.getState();
        // console.log({ base, auth });

        setError(false);
        setLoading(true);
        const item = await fetch(api_url + '/performance/base', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer  ' + auth.token,
            },
            body: JSON.stringify({ base }),
        })
            .then(r => r.json())
            .catch(e => {
                console.warn('catched error');
                console.error(e);
                setError(e.message);
                return [];
            });

        // console.log(item);
        setItems(item);
        setLoading(false);
    }

    function lvlBuildingUp(e, i) {
        const building = store.getState().base.buildings[e];
        building.lvl += 1;
        store.dispatch(replaceBuilding(building));
        setItems(items.filter((_, ii) => ii !== i));
    }
    return (
        <div>
            {loading && <div>loading</div>}
            <Error>{error}</Error>
            <Button onClick={handleClick}>best 5</Button>
            {items.map((e, i) => (
                <Button onClick={() => lvlBuildingUp(e, i)}>{e}</Button>
            ))}
        </div>
    );
}
