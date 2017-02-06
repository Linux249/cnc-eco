import React from 'react';
import { connect } from 'react-redux';
import { LvlNumber } from './LvlNumber'
import './../style/BuildingSlot.css'
//import buildings_pngs from '../util/buildings_img_nod.json'

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
        this.handleKeyDown = this.handleKeyDown.bind(this)

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
        let slot = this.props.slot
        let name = this.props.buildings[slot].name
        return  (
            <div
                ref="target"
                className="BuildingSlot"
                onClick={this.buildingMenuShow}
                onContextMenu={this.buildingDelete}
                onKeyDown={this.handleKeyDown}
                tabIndex="-1"
                onFocus={this.buildingMenuShow}
            >
                {this.props.buildings[slot].lvl && <LvlNumber lvl={this.props.buildings[slot].lvl} />}

                {name &&
                    <img
                        src={require("./../img/buildings/NOD/" + name + ".png")}
                        alt={name}
                    />
                }
            </div>
        );
    }

    buildingMenuShow()
    {
        this.props.dispatch({
            type: 'menu.buildingMenuShow',
            from: this.props.slot
        })
    }
    buildingMenuHide()
    {
        this.props.dispatch({
            type: 'menu.buildingMenuHide',
            from: this.props.slot
        })
    }
    buildingDelete()
    {
        this.props.dispatch({
            type: 'menu.buildingDelete',
            from: this.props.slot
        })
    }


    handleKeyDown(event)
    {
        let key = event.key
        let slot  = this.props.slot
        console.log("Key Pressed: "+ key)
        if (key in nod_buildings_keys) {
            const lvl = this.props.buildings[slot].lvl
            const name = nod_buildings_keys[key]
            console.log(nod_buildings_keys[key])
            const id = key
            this.props.dispatch({
                type: 'menu.buildingSelect',
                name,
                id,
                lvl
            })
            /*this.setState({
                buildingName: nod_buildings_keys[key]
            }, () => {
                console.log("state geändert: " + this.state.building)
            })*/

        } else if (key === "+")
        {
            let lvl = Number.parseInt(this.props.buildings[slot].lvl, 10) + 1
            this.props.dispatch({
                type: 'menu.changeBuildingLvl',
                lvl,
                from: slot
            })
        } else if (key === "-")
        {
            let lvl = Number.parseInt(this.props.buildings[slot].lvl, 10) - 1
            this.props.dispatch({
                type: 'menu.changeBuildingLvl',
                lvl,
                from: slot
            })
        } else if (key.match(/^[0-9]+$/))
        {
            let lvl = this.props.buildings[slot].lvl + key
            this.props.dispatch({
                type: 'menu.changeBuildingLvl',
                lvl,
                from: slot
            })

        }
    }
}



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
