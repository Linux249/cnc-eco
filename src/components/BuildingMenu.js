import React from 'react';
import { connect } from 'react-redux'
//import * as test_arry from './../img/buildings/NOD'
//console.log(test_arry)
//const buildings_png = require.context("../img/buildings/NOD", true, /^\.\/.*\.png$/);
//import crystal_img from '../img/buildings/crystal01.png'

import buildings_pngs from '../util/buildings_img_nod.json'
console.log(buildings_pngs);
var nod_buildings_names = {
        "NOD_Refinery": "r",
        "NOD_Power Plant": "p",
        "NOD_Harvester": "h",
        "NOD_Construction Yard": "y",
        "NOD_Airport": "d",
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
    };


class BuildingMenu extends React.Component {
    constructor(props)
    {
        super(props)
        this.buildingSelect = this.buildingSelect.bind(this)
        this.buildingMenuShow = this.buildingMenuShow.bind(this)

    }
  render() {
    return (
      <div
          className="BuildingMenu"
          style={{
              position: 'absolute',
              backgroundColor: '#EEE',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
              border: '1px solid #CCC',
              borderRadius: 3,
              marginLeft: -5,
              marginTop: 5,
              padding: 10,
            }}
          onClick={this.buildingMenuShow}
      
      >
        {Object.keys(buildings_pngs).map((buildingName) => {
            const img =  require('./../img/buildings/NOD/' + buildingName + '.png')
            return (
                <span className="BuildingMenuItem">
                    <img
                        onClick={this.buildingSelect}
                        src={img} //NOD GDI variable
                        alt={buildingName}
                        data-name={buildingName}
                    />
                    <p>{nod_buildings_names[buildingName]}</p>
                </span>
          );
        })}
      </div>
    );
  }

    buildingSelect(event)
    {
        this.props.dispatch({
            type: 'menu.buildingSelect',
            name: event.target.dataset.name
        })
    }
    buildingMenuShow(event)
    {
        const from =  this.props.x + this.props.y*9
        this.props.dispatch({
            type: 'menu.buildingMenuShow',
            from: from
        })
    }

}




export default connect()(BuildingMenu);