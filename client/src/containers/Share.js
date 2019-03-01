import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { parseToURL } from '../util/parseurl';
import Button from '../style/Button';
import { backgroundColor, border, borderRadius, shadow } from '../style/constants';
import { store } from '../index';
import { api_url } from '../config';

const Area = styled.div`
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    //justify-content: center;
    align-items: center;

    background-color: ${backgroundColor};
    border: ${border};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};

    padding: 5px 12px;
    margin: 1px 2px;
`;

const Loading = styled.div`

`;

const Input = styled.input`
    background-color: ${backgroundColor};
    border: ${border};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};
    
    width: 13rem;
    
    padding: 5px 12px;
    margin: 1px 2px;
`;

const Error = styled.div`

`;

export const Share = (props) => {
    const [url, setUrl] = useState('test');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // clickHandler

    async function handleClick() {
        console.log('handleClick');
        const { base } = store.getState();
        console.log(base);

        setLoading(true);
        setError(false);
        // Todo redux base -> parse base to url
        const baseUrl = parseToURL(base);
        console.log(baseUrl);

        const body = {
            url: baseUrl,
            faction: base.faction,
            name: base.name
        };
        // Post base to short url server and get Url
        try {
            const data = await fetch(api_url + '/baseToUrl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(body)
            }).then(r => r.json());

            setUrl(data.shortUrl);
            console.log(data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        //
        // todo update url

    }


    return (
        <Area>
            <Button onClick={handleClick}>
                Share
            </Button>

            {loading ?
                <Loading>
                    loading
                </Loading>
                :
                <Input value={url}/>
            }
            {error && <Error> {error.message} </Error>}
        </Area>
    );
};
