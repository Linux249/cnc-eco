/**
 * Created by Bombassd on 05.02.2017.
 */
import React, { Component } from 'react'
import './../style/UrlInfo.css'
import { urlToBase } from './../util/parseurl.js'
import { connect } from 'react-redux'

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
        console.log(url)
        console.log(this)
        try {
            const base = urlToBase(url)
            console.log(base)
            this.props.dispatch({
                type: "menu.changeBase",
                base
            })
        } catch (e) {
            console.log(e)
        }
        return 0
    }
}

export default connect()(UrlInfo);