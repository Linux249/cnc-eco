/**
 * Created by Bombassd on 05.02.2017.
 */
import React, { Component } from 'react'
import './../style/UrlInfo.css'
import { urlToBase } from './../util/parseurl.js'
import { replaceAllBase } from '../actions/base'

class UrlInfo extends Component
{
    constructor(props)
    {
        super(props)
    }

    render () {

        return(
            <div className="UrlInfo">
                <label>CncOpt Url</label>
                <input type="url" ref="url"/>
                <div onClick={this.updateBase}> send</div>
            </div>
        )
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
}

export default UrlInfo