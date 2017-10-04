/**
 * Created by Bombassd on 05.02.2017.
 */
import React, { Component } from 'react'
import Info from '../style/UrlInfo'
import Row from '../style/Row'
import Button from '../style/Button'
import Label from '../style/Label'
import urlToBase from './../util/parseurl.js'
import { replaceAllBase } from '../actions/base'

class UrlInfo extends Component
{
    constructor(props)
    {
        super(props)
    }

    updateBase = () =>
    {
        const url = this.refs.url.value
        try {
            const base = urlToBase(url)
            this.props.dispatch(replaceAllBase(base))
        } catch (e) {
            this.refs.url.value = "Fehler"
        }
    }

    render () {
        return(
            <Row>
                <Info>
                    <Label>CncOpt Url</Label>
                    <input type="url" ref="url"/>
                    <Button onClick={this.updateBase}> send</Button>
                </Info>
            </Row>
        )
    }
}

export default UrlInfo