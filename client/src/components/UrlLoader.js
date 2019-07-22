/**
 * Created by Bombassd on 05.02.2017.
 */
import React, { Component } from 'react';
import Button from '../style/Button';
import urlToBase from '../util/parseurl.js';
import { replaceAllBase } from '../store/actions/base';
import Input from '../style/Input';
import Row from '../style/Row';
import { ReactComponent as DownloadIcon } from '../icons/Download.svg';
import Title from '../style/Title';
import Container from '../style/Container';

class UrlLoader extends Component {
    updateBase = () => {
        const url = this.refs.url.value;
        try {
            console.log(url);
            const base = urlToBase(url);
            console.log(base);
            this.props.dispatch(replaceAllBase(base));
        } catch (e) {
            console.log(e);
            this.refs.url.value = 'Error';
        }
    };

    render() {
        return (
            <Container>
                <Title>Load from cnc opt url</Title>
                <Row>
                    <Input small type="url" ref="url" placeholder="Paste the link here" />
                    <Button onClick={this.updateBase}>
                        <DownloadIcon />
                    </Button>
                </Row>
            </Container>
        );
    }
}

export default UrlLoader;
