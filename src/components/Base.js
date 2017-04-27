import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BuildingSlot from './BuildingSlot.js'
import BuildingMenu from './BuildingMenu.js';

/*var nod_buildings_names = {
        "NOD_Refinery": "r",
        "NOD_Power Plant": "p",
        "NOD_Harvester": "h",
        "NOD_Construction Yard": "y",
        "NOD_Airport": "d",
        //    "NOD_Trade Center": "u",
        "NOD_Defense HQ": "q",
        "NOD_Barracks": "b",
        "NOD_Silo": "s",
        "NOD_Factory": "f",
        "NOD_Harvester_Crystal": "n",
        "NOD_Command Post": "e",
        "NOD_Support_Art": "z",
        "NOD_Support_Ion": "i",
        "NOD_Accumulator": "a",
        "NOD_Support_Air": "x",
        "NOD_Defense Facility": "w"
    },
    nod_buildings_keys = {
        "r": "NOD_Refinery",
        "p": "NOD_Power Plant",
        "h": "NOD_Harvester",
        "y": "NOD_Construction Yard",
        "d": "NOD_Airport",
        "q": "NOD_Defense HQ",
        "b": "NOD_Barracks",
        "s": "NOD_Silo",
        "f": "NOD_Factory",
        "n": "NOD_Harvester_Crystal",
        "e": "NOD_Command Post",
        "z": "NOD_Support_Art",
        "i": "NOD_Support_Ion",
        "a": "NOD_Accumulator",
        "x": "NOD_Support_Air",
        "w": "NOD_Defense Facility"
    }
*/
  


class Base extends Component
{


render()
{
    const { show } = this.props
      // build all slots
      const slots = [...Array(8).keys()].map(function(y) {

          return (
              <div key={"row " + y} className={"row " + y} >
                  {[...Array(9).keys()].map(function(x) {
                      const slot = x+y*9
                     // const building = (buildings[slot]) ? buildings[slot]: false; // warum building.slot?
                      return <BuildingSlot
                          key={slot}
                          slot={slot}
                     //     isEmpty={!building}
                      />
                  })
                  }
              </div>
          )
      })

      return (
        <div>
          <div className="Base" /*//style={Style}*/>
                        { parseInt(show) && <BuildingMenu /*choosenBuilding={this.choosenBuilding} *//> }

            <div className="BaseLayout" >
              {slots}
            </div>
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