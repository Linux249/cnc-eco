//Libs
import React, { Component } from 'react'
import { connect } from 'react-redux';
import LineChart from './LineChart.js'
import BaseHeader from './BaseHeader.js';
import { hideBuildingMenu } from './../actions/menu'
import { updateBuildingsFromURL } from './../actions/buildings'
import './../style/App.css'

// Components
import Base from './Base.js'


class App extends Component
{
    constructor(props){
        super()

    }


    componentDidMount(){
        console.log("PARAM FROM URL")
        const url = this.props.params.base
        // console.info(param)
        console.log("update buildings in store")
        if(url) this.props.updateBase(url)


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
    return ({

    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideMenu: () => dispatch(hideBuildingMenu()),
        updateBase: (url) => dispatch(updateBuildingsFromURL(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

