import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LvlNumber } from './LvlNumber'
import './../style/BuildingSlot.css'
import { showBuildingMenu } from './../actions/menu'
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


class BuildingSlot extends Component {
    constructor(props) {
        super(props)
        //this.showBuildingMenu = this.showBuildingMenu.bind(this)
        // this.buildingMenuHide = this.buildingMenuHide.bind(this)
        // this.buildingDelete = this.buildingDelete.bind(this)
        // this.handleKeyDown = this.handleKeyDown.bind(this)
        // this.drop = this.drop.bind(this)
        // this.drag = this.drag.bind(this)
    }


    componentDidMount() {
       // window.addEventListener('mouseup', this._onDragLeave);
        window.addEventListener('dragenter', this.drag);
     //   window.addEventListener('dragover', this._onDragOver);
        window.addEventListener('drop', this.drop);
      //  document.getElementById('dragbox').addEventListener('dragleave', this._onDragLeave);
    }



    render() {
        const { slot, building, showBuildingMenu} = this.props
        const buildingName = nod_buildings_keys[building.type]
        //let building = buildings[slot]
        return  (
            <div
                ref="target"
                className="BuildingSlot"
                onClick={() => showBuildingMenu(slot)}
               // onContextMenu={this.buildingDelete}
            //    onKeyDown={this.handleKeyDown}
                //tabIndex="-1"
                //onFocus={() => showBuildingMenu(slot)}
                //onDrop={this.drop}

                //onDragOver={(e) => e.preventDefault()}
            >
                {building.lvl && <LvlNumber lvl={building.lvl} />}
                {buildingName &&
                    <img
                        src={require("./../img/buildings/NOD/" + buildingName + ".png")}
                        alt={building.name}
                       // draggable="true"
                        //onDragStart={this.drag}
                    />
                }
            </div>
        )
    }
    // drop(e)
    // {
    //     //e.preventDefault()
    //     e.preventDefault()
    //     console.log("DROP ELEMENT FROM " + this.props.slot)
    //     this.props.dispatch({
    //         type: 'menu.dropBuilding',
    //         from: this.props.slot
    //     })
    // }
    //
    // drag()
    // {
    //     let slot = this.props.slot
    //     let building = this.props.buildings[slot]
    //    // 'menu.dragBuilding'
    //     this.props.dispatch({
    //         type: 'menu.dragBuilding',
    //         from: this.props.slot,
    //         building
    //
    //     })
    // }
    //
    //
    // //
    // // buildingMenuShow()
    // // {
    // //     this.props.dispatch({
    // //         type: 'menu.bMenuOpenFrom',
    // //         from: this.props.slot
    // //     })
    // // }
    // buildingMenuHide()
    // {
    //     this.props.dispatch({
    //         type: 'menu.buildingMenuHide',
    //         from: this.props.slot
    //     })
    // }
    // buildingDelete()
    // {
    //     this.props.dispatch({
    //         type: 'menu.buildingDelete',
    //         from: this.props.slot
    //     })
    // }
    //
    //
    // handleKeyDown(event)
    // {
    //     let key = event.key
    //     let slot  = this.props.slot
    //     console.log("Key Pressed: "+ key)
    //     if (key in nod_buildings_keys) {
    //         const lvl = this.props.buildings[slot].lvl
    //         const name = nod_buildings_keys[key]
    //         console.log(nod_buildings_keys[key])
    //         const id = key
    //         this.props.dispatch({
    //             type: 'menu.buildingSelect',
    //             name,
    //             id,
    //             lvl
    //         })
    //         /*this.setState({
    //             buildingName: nod_buildings_keys[key]
    //         }, () => {
    //             console.log("state geändert: " + this.state.building)
    //         })*/
    //
    //     } else if (key === "+")  //builing lvl up
    //     {
    //         let lvl = Number.parseInt(this.props.buildings[slot].lvl, 10) + 1
    //         this.props.dispatch({
    //             type: 'menu.changeBuildingLvl',
    //             lvl,
    //             from: slot
    //         })
    //     } else if (key === "-")     //builing lvl down
    //     {
    //         let lvl = Number.parseInt(this.props.buildings[slot].lvl, 10) - 1
    //         this.props.dispatch({
    //             type: 'menu.changeBuildingLvl',
    //             lvl,
    //             from: slot
    //         })
    //     } else if (key.match(/^[0-9]+$/))   // new  lvl by number
    //     {
    //         let lvl = this.props.buildings[slot].lvl + key
    //         this.props.dispatch({
    //             type: 'menu.changeBuildingLvl',
    //             lvl,
    //             from: slot
    //         })
    //
    //     }
    // }
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

function mapStateToProps(state, props) {
    //console.log("+++++STATE++++++")
    //console.log(state)

    return ({

        building: state.buildings[props.slot]
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        showBuildingMenu: (from) => dispatch(showBuildingMenu(from)),
        //  changeBuildingLvl: (event, from) => dispatch(changeBuildingLvl(event, from))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuildingSlot)
