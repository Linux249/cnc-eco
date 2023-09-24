import React, { useState } from 'react';
import { parseToURL } from '../util/parseurl';
import Button from '../style/Button';
import { store } from '../pages/_app';
import Input from '../style/Input';
import Alert from '../style/Alert';
import ShareIcon from '../icons/Share.tsx';
import Title from '../style/Title';
import Container from '../style/Container';
import styled from 'styled-components';

import { API_URL } from "../lib/const";

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Share = () => {
    const [url, setUrl] = useState('');
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
            name: base.name,
        };
        // Post base to short url server and get Url
        try {
            const data = await fetch(API_URL + '/baseToUrl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(body),
            }).then(r => r.json());

            setUrl(data.shortUrl);
            console.log(data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        // todo update url
    }

    return (
        <Container>
            <Row>
                <Title>Share your bases</Title>
                <Button onClick={handleClick}>
                    <ShareIcon></ShareIcon>
                </Button>
            </Row>
            {loading && <div>loading...</div>}
            {url && (
                <Row>
                    <Input
                        small
                        placeholder="Here comes your shortlink"
                        value={loading ? 'loading ...' : url}
                        readOnly
                    />
                </Row>
            )}
            {error && <Alert> {error.message} </Alert>}
        </Container>
    );
};

export default Share;
