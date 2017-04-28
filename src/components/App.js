//Libs
import React, { Component } from 'react'
import { connect } from 'react-redux';
import LineChart from './LineChart.js'
import BaseHeader from './BaseHeader.js';
import { hideBuildingMenu } from './../actions/menu'


// Components
import Base from './Base.js'


class App extends Component
{



    render()
    {

        return(
            <div className="app" >
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

