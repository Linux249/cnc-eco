import React, { useState } from 'react';
import Button from '../style/Button';
import {store} from '../index';
import { api_url } from '../config';

export function BaseMenu() {

    async function handleClick() {
        console.log('get performance/base')
        console.log(store)
        const {base, auth} = store.getState()
        console.log({base, auth})

        const item = await fetch(api_url + '/performance/base', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer  ' + auth.token,
            },
            body: JSON.stringify({base}),
        }).then(r => r.json()).catch(e => {
            console.warn('catched error');
            console.error(e);
            //this.setState({ error: e.message });
        });
        console.log(item)

    }

    return (
        <div>
            <Button onClick={handleClick}>best 5</Button>
        </div>
    )
}
