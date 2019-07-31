import React, { useState } from 'react';
import { parseToURL } from '../util/parseurl';
import Button from '../style/Button';
import { store } from '../index';
import { api_url } from '../config';
import Input from '../style/Input';
import Row from '../style/Row';
import Alert from '../style/Alert';
import { ReactComponent as ShareIcon } from '../icons/Share.svg';
import Title from '../style/Title';
import Container from '../style/Container';

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
            const data = await fetch(api_url + '/baseToUrl', {
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
            <Title>Share your bases</Title>
            <Row>
                <Input
                    small
                    placeholder="Here comes your shortlink"
                    value={loading ? 'loading ...' : url}
                />
                <Button onClick={handleClick}>
                    <ShareIcon></ShareIcon>
                </Button>
                {error && <Alert> {error.message} </Alert>}
            </Row>
        </Container>
    );
};

export default Share;