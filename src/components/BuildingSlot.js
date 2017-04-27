import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LvlNumber } from './LvlNumber'
import './../style/BuildingSlot.css'
import { showBuildingMenu } from './../actions/menu'
import { switchBuildings } from './../actions/buildings'
import { DropTarget, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



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

const ItemTypes = {
    BUILDING: 'building'
}

const buildingSource = {
    beginDrag({ slot, building}) {
        console.log("DRAG")
        console.log(slot)
        console.log(building)
        return { from: slot};
    },

    endDrag({ switchBuildings }, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        const from = monitor.getItem().from
        const to = monitor.getDropResult().slot

        // When dropped on a compatible target, do something
        //const item = monitor.getItem().from;
        console.log("drop from")
        console.log(from)
        //const dropResult = monitor.getDropResult();
        console.log("DROP RESLUT")
        console.log(to)
        switchBuildings(from, to)
        //CardActions.moveCardToList(item.id, dropResult.listId);
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const buildingTarget = {
    // extact slot from props in one line
    drop({ slot }) {
        console.log("DROP on slot: " + slot)
        return {
            slot,
        }
    }
}

//@DragSource('building', buildingSource, collect)
class BuildingSlot extends Component {


    render() {
        const { slot, building, showBuildingMenu, connectDragSource, connectDropTarget , isDragging} = this.props
        const buildingName = nod_buildings_keys[building.type]
        //let building = buildings[slot]
        return  (
            connectDropTarget(connectDragSource(
                <div
                    style={{
                        opacity: isDragging ? 0.5 : 1
                    }}

                    //ref="target"
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
        ))
    }


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
        switchBuildings: (from, to) => dispatch(switchBuildings(from, to))
        //  changeBuildingLvl: (event, from) => dispatch(changeBuildingLvl(event, from))
    }
}

BuildingSlot = DropTarget('building', buildingTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(BuildingSlot);

BuildingSlot = DragSource('building', buildingSource, collect)(BuildingSlot)
export default connect(mapStateToProps, mapDispatchToProps)(BuildingSlot)
