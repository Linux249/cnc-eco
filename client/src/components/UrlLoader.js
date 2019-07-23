/**
 * Created by Bombassd on 05.02.2017.
 */
import React, { useState } from 'react';
import Button from '../style/Button';
import urlToBase from '../util/parseurl.js';
import { replaceAllBase } from '../store/actions/base';
import Input from '../style/Input';
import Row from '../style/Row';
import { ReactComponent as DownloadIcon } from '../icons/Download.svg';
import Title from '../style/Title';
import Container from '../style/Container';

function UrlLoader() {
    const [url, setUrl] = useState('');

    function updateBase() {
        try {
            console.log(url);
            const base = urlToBase(url);
            console.log(base);
            this.props.dispatch(replaceAllBase(base));
        } catch (e) {
            console.log(e);
            setUrl('Error');
        }
    }

    return (
        <Container>
            <Title>Load from cnc opt url</Title>
            <Row>
                <Input
                    small
                    type="url"
                    onChange={({target: {e}}) => setUrl(e)}
                    value={url}
                    placeholder="Paste the link here"
                />
                <Button onClick={updateBase}>
                    <DownloadIcon />
                </Button>
            </Row>
        </Container>
    );
}

export default UrlLoader;
