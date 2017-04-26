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
        this.updateBase = this.updateBase.bind(this)
    }

    render ()
    {
        return(
            <div className="UrlInfo">
                <label>CncOpt Url</label>
                <input type="url" ref="url"/>
                <button onClick={this.updateBase}> send</button>
            </div>
        )
    }

    updateBase()
    {
        console.log("REREREREasasasRERERERERER")
        //const url = "" //get URL from input
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