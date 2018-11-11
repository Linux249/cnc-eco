/**
 * Created by Bombassd on 05.02.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Info from '../style/UrlInfo';
import Row from '../style/Row';
import Button from '../style/Button';
import Label from '../style/Label';
import urlToBase from './../util/parseurl.js';
import { replaceAllBase, replaceBaseFromUrl } from '../store/actions/base';

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
            <Row>
                <Info>
                    <Label>CncOpt Url</Label>
                    <input type="url" ref="url" />
                    <Button onClick={this.updateBase}> send</Button>
                </Info>
            </Row>
        );
    }
}
const mapStateToProps = () => {
    return {};
};

// TODO was copy pasted here as a reminder for an old? way for changing base via url
const mapDispatchToProps = dispatch => {
    return {
        replaceBaseFromUrl: url => dispatch(replaceBaseFromUrl(url)),
    };
};

export default connect(mapStateToProps)(UrlInfo);
