import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { LvlNumber } from './LvlNumber'
import './../style/BuildingSlot.css'
import { showBuildingMenu } from './../actions/menu'
import { switchBuildings, keyInputBase } from './../actions/buildings'
import { DropTarget, DragSource } from 'react-dnd'
import nod_buildings_keys from '../util/nod_buildings_keys.json'








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
            showBuildingMenu,
            handleKeyDown,
            connectDragSource,
            connectDropTarget ,
            isDragging
        } = this.props
        const buildingName = nod_buildings_keys[building.type]

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
                    {building.lvl && <LvlNumber lvl={building.lvl} />}
                    {buildingName &&
                        <img
                            src={require("./../img/buildings/NOD/" + buildingName + ".png")}
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
