/**
 * Created by Bombassd on 05.02.2017.
 */
import React, { Component } from 'react'
import Info from '../style/UrlInfo'
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
            <Info>
                <label>CncOpt Url</label>
                <input type="url" ref="url"/>
                <div onClick={this.updateBase}> send</div>
            </Info>
        )
    }
}

export default UrlInfo