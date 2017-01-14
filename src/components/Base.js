//Libs
import React from 'react';
import { connect } from 'react-redux';
import BaseHeader from './Baseheader.js';
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
var BUILDINGS = [
  {
    name: "NOD_Refinery",
    short_key: "r",
    lvl: 20,
    x: 1,
    y: 1,
    slot: 10,
  },
  {
    name: "NOD_Construction Yard",
    short_key: "y",
    lvl: 20,
    x: 5,
    y: 5,
    slot: 50,
  },
  {
    name: "NOD_Silo",
    short_key: "s",
    lvl: 20,
    x: 3,
    y: 3,
    slot: 30,
  },
  {
    name: "NOD_Support_Air",
    short_key: "y",
    lvl: 20,
    x: 7,
    y: 7,
    slot: 70,
  },
  
];*/
  


class Base extends React.Component
{
    constructor(props){
        super(props)
    }
  /*propTypes() {
    faction: React.PropTypes.string,
    buildingMenuCaller: React.PropTypes.string,
    buildings: React.PropTypes.arrayOf(React.PropTypes.number),
    showBuildingMenu: React.PropTypes.bool,
  }*/

/*  getInitialState() {
    return  {
      showBuildingMenu: false,
      base: this.props.base,
    };
  }*/
/*  choosenBuilding(building) {
    console.log(building);
    console.log(this.state.buildingMenuCaller);
    console.log(this.state.base.buildings[2].name);
    let base = this.state.base;
    base.buildings[this.state.buildingMenuCaller].name = building;
    this.setState({base: base});
    console.log(this.state.base.buildings[this.state.buildingMenuCaller]);
  }*/

render()
{
      // build all slots
      var slots = [...Array(8).keys()].map(function(y) {

          return (
              <div className={"row " + y} >
                  {[...Array(9).keys()].map(function(x) {
                      const slot = x+y*9
                      const building = (this.props.buildings[slot]) ? this.props.buildings[slot]: {}; // warum building.slot?
                      return <BuildingSlot
                          x={x}
                          y={y}
                          slot={slot}
                          isEmpty={!building}
                          buildingName={building.name ? building.name : "empty"}
                      />
                  }.bind(this))
                  }
              </div>
          )
      }.bind(this))

      return (
        <div>
          <BaseHeader ref="target"/>
          <div className="Base" /*//style={Style}*/>
                        { this.props.show && <BuildingMenu /*choosenBuilding={this.choosenBuilding} *//> }

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
        show: state.showBuildingMenu,
        buildings: state.buildings
    });
}
export default connect(mapStateToProps)(Base);