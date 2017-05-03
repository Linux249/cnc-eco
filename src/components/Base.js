import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BuildingSlot from './BuildingSlot.js'
import BuildingMenu from './BuildingMenu.js';
import Details from './Details.js'
import './../style/Base.css'
import { showBuildingMenu } from './../actions/menu'


class Base extends Component
{


render()
{
    const { show } = this.props
    const slots = [...Array(8).keys()].map(function(y) {
        return (
            <div key={"rowB " + y} className={"rowB " + y}>
                {[...Array(9).keys()].map(function(x) {
                  const slot = x+y*9
                  return <BuildingSlot key={slot} slot={slot} />
                })
              }
            </div>
        )
      })

    return (
        <div className="BaseRow" >
            <div className="BaseSideLeft">
                { parseInt(show) >= 0 && <BuildingMenu /> }
            </div>
            <div className="BaseMiddle">
                <div className="Base" >
                    {slots}
                </div>
            </div>
            <div className="BaseSideRight" >
                <Details />
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return ({
        show: state.menu.from,
       // buildings: state.buildings
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        showBuildingMenu: (from) => dispatch(showBuildingMenu(from))
    }
}

Base = DragDropContext(HTML5Backend)(Base)
export default connect(mapStateToProps, mapDispatchToProps)(Base);