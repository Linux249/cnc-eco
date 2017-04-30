import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { LvlNumber } from './LvlNumber'
import './../style/BuildingSlot.css'
import { showBuildingMenu } from './../actions/menu'
import { switchBuildings, keyInputBase } from './../actions/buildings'
import { DropTarget, DragSource } from 'react-dnd'
import nod_buildings_keys from '../util/nod_buildings_keys.json'
// import './../img/buildings/nod'
// import './../img/buildings/gdi'
var requireContext = require.context("./../img/buildings/nod", true, /^\.\/.*\.png$/);
var requireContext2 = require.context("./../img/buildings/gdi", true, /^\.\/.*\.png$/);
requireContext.keys().map(requireContext);
requireContext2.keys().map(requireContext2);






const buildingSource = {
    beginDrag({ slot }) {
        return { from: slot} 
    },

    endDrag({ switchBuildings }, monitor, component) {
        if (!monitor.didDrop()) {
            return 
        }
        const from = monitor.getItem().from
        const to = monitor.getDropResult().slot
        switchBuildings(from, to)
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const buildingTarget = {
    drop({ slot }) {
        return { slot }
    }
}


class BuildingSlot extends Component {


    render() {
        const { slot,
            building,
            active,
            fraction,
            showBuildingMenu,
            handleKeyDown,
            connectDragSource,
            connectDropTarget ,
            isDragging
        } = this.props
        let buildingName = nod_buildings_keys[building.type]
        let nodIMG = 'XXXundefined'
        let gdiIMG = 'XXXundefined'
        if(buildingName) {
            nodIMG = require("./../img/buildings/nod/NOD" + buildingName.slice(3)+ ".png")
            gdiIMG = require("./../img/buildings/gdi/GDI" + buildingName.slice(3)+ ".png")
        }
        return  (
            connectDropTarget(connectDragSource(
                <div
                    style={{
                        opacity: isDragging ? 0.5 : 1,
                        backgroundColor: active===slot ? 'grey': undefined
                    }}
                    className="BuildingSlot"
                    //onClick={() => showBuildingMenu(slot)}
                   // onContextMenu={this.buildingDelete}
                    onKeyDown={(e) => handleKeyDown(e, slot, building)}
                    tabIndex="0"
                    onFocus={() => showBuildingMenu(slot)}
                >
                    {/*{buildingName && require("./../img/buildings/nod/NOD" + buildingName.slice(3)+ ".png")}*/}
                    {/*{buildingName && require("./../img/buildings/gdi/GDI" + buildingName.slice(3) + ".png")}*/}
                    {building.lvl && <LvlNumber lvl={building.lvl} />}
                    {buildingName &&
                        <img
                            src={fraction === "gdi" ? gdiIMG : nodIMG }
                            alt={building.name}
                        />
                    }
                </div>
            )
        ))
    }
}



function mapStateToProps(state, props) {
    return ({
        building: state.buildings[props.slot],
        active: state.menu.from,
        fraction: state.menu.fraction
    }) 
}
const mapDispatchToProps = (dispatch) => {
    return {
        showBuildingMenu: (from) => dispatch(showBuildingMenu(from)),
        switchBuildings: (from, to) => dispatch(switchBuildings(from, to)),
        handleKeyDown: (e, from, building) => dispatch(keyInputBase(e, from, building))
    }
}

BuildingSlot = DropTarget('building', buildingTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(BuildingSlot) 

BuildingSlot = DragSource('building', buildingSource, collect)(BuildingSlot)
export default connect(mapStateToProps, mapDispatchToProps)(BuildingSlot)
