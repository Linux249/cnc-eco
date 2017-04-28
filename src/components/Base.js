import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BuildingSlot from './BuildingSlot.js'
import BuildingMenu from './BuildingMenu.js';
import './../style/Base.css'


class Base extends Component
{


render()
{
    const { show } = this.props
      // build all slots
    const slots = [...Array(8).keys()].map(function(y) {
        return (
            <div key={"row " + y} className={"row " + y}>
                {[...Array(9).keys()].map(function(x) {
                  const slot = x+y*9
                  return <BuildingSlot key={slot} slot={slot} />
                })
              }
            </div>
        )
      })

    return (
        <div className="BaseRow">

                { parseInt(show) && <BuildingMenu /> }
            <div className="BaseArea">
                <div className="Base" >
                    {slots}
                </div>
            </div>
            <div >
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

Base = DragDropContext(HTML5Backend)(Base)
export default connect(mapStateToProps)(Base);