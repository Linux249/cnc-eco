//Libs
import React, { Component } from 'react'
import { connect } from 'react-redux';
import LineChart from './LineChart.js'
import BaseHeader from './BaseHeader.js';
import { urlToBase } from '../util/parseurl.js'



// Components
import Base from './Base.js'


class App extends Component
{
    // constructor(props)
    // {
    //     super(props)
    //     this.changeBase = this.changeBase.bind(this)
    //
    // }

    render()
    {
    //     if (this.props.params.param)
    //     {
    //         console.log("INSIDE APP")
    //         console.log("This ist the url param: " + this.props.params.param)
    //         this.changeBase()
    //     }
    return(
        <div className="app">
            <BaseHeader ref="target"/>
            <Base faction="base.faction" />
            <LineChart />
        </div>
    )
  }
    //
    // changeBase()
    // {
    //     let base
    //     try {
    //         base = urlToBase(this.props.params.param)
    //     } catch(e){
    //         console.error("Paramter von URL konnte nicht geparst werden")
    //     }
    //     console.log("is a right Base getting to the ")
    //     console.log("BASE BASE BASE")
    //     console.log(base)
    //
    //     if (base)
    //     {
    //         const nwe = JSON.stringify(base.buildings)
    //         const old = JSON.stringify(this.props.buildings)
    //         if (nwe != old) {
    //             console.error("Base wird über URL geupdated ")
    //             this.props.dispatch({
    //                 type: "menu.changeBase",
    //                 base: base
    //             })
    //
    //         }
    //     }
    // }
}


function mapStateToProps(state) {
    return ({
        buildings: state.buildings,
    });
}
export default connect(mapStateToProps)(App);

