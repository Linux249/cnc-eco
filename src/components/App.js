//Libs
import React from 'react';
import { connect } from 'react-redux';
import { LineChart } from './LineChart.js'


// Components
import Base from './Base.js'


class App extends React.Component
{

    render()
    {
    return(
        <div className="app">
            <Base faction="base.faction" base={this.props.buildings}/>
            <LineChart />
        </div>
    )
  }
}


function mapStateToProps(state) {
    return ({
        buildings: state.buildings,
    });
}
export default connect(mapStateToProps)(App);

