import React from 'react';
import { connect } from 'react-redux';

//import buildings_pngs from '../util/buildings_img_nod.json'

// import BuildingMenu from './BuildingMenu.js';

// var counter = 0;
const nod_buildings_keys = {
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
    };


class BuildingSlot extends React.Component {
  constructor(props) {
    super(props);
    /*this.state = {date: new Date()};
    this.state.buildingName = this.props.buildingName;
    this.state.isEmpty = this.props.isEmpty;*/
      this.buildingMenuShow = this.buildingMenuShow.bind(this)
      this.buildingMenuHide = this.buildingMenuHide.bind(this)
      this.buildingDelete = this.buildingDelete.bind(this)

  }

    // getInitialState: function() {
    //   return {
    //     buildingName: this.props.buildingName,
    //     isEmpty: this.props.isEmpty,
    //   }
    // },

    //Eingabe mit der Tastatur
    /*  onKeyPress: function (e){
        console.log("key press");
        console.log(e.key);
        //return console.log("wirklich");
      },*/
/*    onKeyDown = (e) => {
        console.log("Key Pressed: "+ e.key);
        if (e.key in nod_buildings_keys) {
            this.setState({
                buildingName: nod_buildings_keys[e.key]
            }, () => {
                console.log("state geändert: " + this.state.building);
            });
        } else {
            console.log("ungültiges Zeichen: " + e.key);
        }
    }*/
   /* //verändert das Bild
    //TODO menü zur auswahl des gebäudes
    handleClick = (e) => {
      //toogle menu
       // this.props.toggleMenu(true);
      //Linksklick != Rechtsklick
      if (e.type === "click") {
        //this.props.toggleMenu();
        
        this.setState({
            isEmpty: false,
            buildingName: "res_tiberium_01"
        });
      } else if (e.type === "contextmenu") {
        e.preventDefault();
        this.setState({
            isEmpty: true,
            buildingName: "empty"
        });
      }
      //  console.log("Click: "+ e.type); // type: right, value - contextmenu
    }
    testFunc = () => {
      console.log("wahrs");
      this.setState({
        isEmpty: false,
        buildingName: "res_tiberium_01"
      })
    }
    toggleMenuOf =  () => {
      console.log("falsch");
      this.props.toggleMenu(false);
    }*/
    render() {
        return  (
            <span
                ref="target"
                className="BuildingSlot"
                key={this.props.x + this.props.y*9}
                //x={this.props.x}
                // y={this.props.y}
                //z={this.state.buildingName}
                onClick={this.buildingMenuShow}
                onContextMenu={this.buildingDelete}
                //onKeyDown={this.buildingMenuHide}/*this.props.onKeyDown*/

                tabIndex="-1"
                onFocus={this.buildingMenuShow}
                 //onBlur={this.buildingMenuHide}
            >

              <img
              src={(this.props.buildingName) ? require("./../img/buildings/NOD/" + this.props.buildingName + ".png"): ""}
              alt={this.props.buildingName}
              />
          </span>

        );
        //const img = require('./../img/buildings/NOD/' + this.props.buildingName + '.png')
    }

    buildingMenuShow(event)
    {
        const from =  this.props.x + this.props.y*9
        this.props.dispatch({
            type: 'menu.buildingMenuShow',
            from: from
        })
    }
    buildingMenuHide(event)
    {
        const from =  this.props.x + this.props.y*9
        this.props.dispatch({
            type: 'menu.buildingMenuHide',
            from: from
        })
    }
    buildingDelete(event)
    {
        const from =  this.props.x + this.props.y*9
        this.props.dispatch({
            type: 'menu.buildingDelete',
            from: from
        })
    }
};

/*BuildingSlot.propTypes = {
  buildingName: React.PropTypes.string,
  isEmpty: React.PropTypes.bool,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
};

BuildingSlot.defaultProps = {
  buildingName: "empty",
  isEmpty: true
};*/

function mapStateToProps(state) {
    //console.log("+++++STATE++++++")
    //console.log(state)

    return ({

        buildings: state.buildings
    });
}
export default connect(mapStateToProps)(BuildingSlot);
