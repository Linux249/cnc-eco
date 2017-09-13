import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { LvlNumber } from './LvlNumber'
import './../style/BuildingSlot.css'
import { showBuildingMenu } from './../actions/menu'
import { switchBuildings, keyInputBase, deleteBuilding } from './../actions/buildings'
import { DropTarget, DragSource } from 'react-dnd'


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


const activeColor = '#b6b6b6'

class BuildingSlot extends Component {


    contextClick = (e, from) => {
        e.preventDefault()
        this.props.deleteBuilding(from)
    }

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
        let img = 'undefined'
        if(building.type) {
            img = require("./../img/buildings/"+fraction+  "/"+ building.type + ".png")
        }
        return  (
            connectDropTarget(connectDragSource(
                <div
                    style={{
                        opacity: isDragging ? 0.5 : 1,
                        backgroundColor: active===slot ? activeColor: undefined
                    }}
                    className="BuildingSlot"
                    //onClick={() => showBuildingMenu(slot)}
                   // onContextMenu={this.buildingDelete}
                    onKeyDown={(e) => handleKeyDown(e, slot, building)}
                    tabIndex="0"
                    onFocus={() => showBuildingMenu(slot)}
                    onContextMenu={(e) => this.contextClick(e, slot)}

                >
                    {building.lvl && <LvlNumber lvl={building.lvl} />}
                    {building.type &&
                        <img
                            src={img}
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
        handleKeyDown: (e, from, building) => dispatch(keyInputBase(e, from, building)),
        deleteBuilding: (from) => dispatch(deleteBuilding(from))
    }
}

BuildingSlot = DropTarget('building', buildingTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(BuildingSlot) 

BuildingSlot = DragSource('building', buildingSource, collect)(BuildingSlot)
export default connect(mapStateToProps, mapDispatchToProps)(BuildingSlot)
