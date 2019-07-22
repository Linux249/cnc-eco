import React, { useState } from 'react';
import Button from '../style/Button';
import { store } from '../index';
import { api_url } from '../config';
import Alert from '../style/Alert';
import { replaceSlot } from '../store/actions/base';
import Row from '../style/Row';
import styled from 'styled-components';

const Img = styled.img`
    height: 30px;
`;

function BestBuildingsToUpgrade() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { buildings, faction } = store.getState().base;

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
        store.dispatch(replaceSlot(building, 'buildings'));
        setItems(items.filter((_, ii) => ii !== i));
    }

    return (
        <Row wrap>
            {loading && <div>loading</div>}
            <Alert>{error}</Alert>
            <Button onClick={handleClick}>find best tib</Button>
            {items.map((e, i) => {
                const img = require('./../img/buildings/' +
                    faction +
                    '/' +
                    buildings[e].type +
                    '.png');
                return (
                    <Button onClick={() => lvlBuildingUp(e, i)}>
                        <Img src={img} alt="rw" />
                        {buildings[e].lvl}
                    </Button>
                );
            })}
        </Row>
    );
}

export default BestBuildingsToUpgrade;
