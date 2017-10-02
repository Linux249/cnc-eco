//Libs
import React, { Component } from 'react'
import { connect } from 'react-redux';
import LineChart from './LineChart.js'
import BaseHeader from './BaseHeader.js';
import { replaceAllBase } from './../actions/base'
import urlToBase from'../util/parseurl'
import './../style/App.css'

// Components
import Base from './Base.js'

class App extends Component
{
    componentDidMount(){
        console.log("PARAM FROM URL")
        const url = this.props.params.base
        console.info(url)
        console.log("update buildings in store")
        try {
            const base = urlToBase(url)
            this.props.replaceAllBase(base)
        } catch (e) {
            console.log("Fehler beim Barsen der URL")
        }
    }

    render()
    {
        return(
            <div className="App" >
                <BaseHeader ref="target"/>
                <Base faction="base.faction" />
                <LineChart />
            </div>
        )
    }

}


function mapStateToProps(state) {
    return ({})
}

const mapDispatchToProps = (dispatch) => {
    return {
        replaceAllBase: (url) => dispatch(replaceAllBase(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

