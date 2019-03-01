/**
 * Created by Bombassd on 05.02.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../style/Button';
import urlToBase from '../util/parseurl.js';
import { replaceAllBase } from '../store/actions/base';
import Input from '../style/Input';
import Area from '../style/Area';
import Row from '../style/Row';

class UrlInfo extends Component {
    constructor(props) {
        super(props);
    }

    updateBase = () => {
        const url = this.refs.url.value;
        try {
            console.log(url);
            const base = urlToBase(url);
            console.log(base);
            this.props.dispatch(replaceAllBase(base));
        } catch (e) {
            console.log(e);
            this.refs.url.value = 'Fehler';
        }
    };

    render() {
        return (
            <Area>
                <Row>
                    <Button onClick={this.updateBase}> send</Button>
                    <Input type="url" ref="url" placeholder="Enter CnC Opt URL..."/>
                </Row>
            </Area>
        );
    }
}

export default connect()(UrlInfo);
