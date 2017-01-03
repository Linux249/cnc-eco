//Libs
import React from 'react';
import { connect } from 'react-redux';

//css
//import '.../style/main.css';


// Components
import Base from './Base.js'


class App extends React.Component
{

  render()
  {
    return(
        <div className="app">
          <Base faction="base.faction" base={this.props.buildings}/>
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

