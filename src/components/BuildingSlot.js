import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux' 
import { LvlNumber } from './LvlNumber'
import { showBuildingMenu } from './../actions/menu'
import { switchBuildings, keyInputBase} from './../actions/buildings'
import { DropTarget, DragSource } from 'react-dnd'
import {removeBuilding} from '../actions/base'
import Slot from '../style/BuildingSlot'



const activeColor = '#b6b6b6'

class BuildingSlot extends Component {


    contextClick = (e, from) => {
        e.preventDefault()
        this.props.removeBuilding(from)
    }

    render() {
        const { slot,
            building,
            active,
            faction,
            showBuildingMenu,
            handleKeyDown,
            connectDragSource,
            connectDropTarget ,
            isDragging,
            ...rest
        } = this.props
        let img = 'undefined'
        if(building.type) {
            img = require(`../img/buildings/N/${building.type}.png`)    // TODO add fraction from base
        }

        return  (

                <Slot
                    {...rest}
                    ref={instance => {
                        connectDropTarget(findDOMNode(instance))
                        connectDragSource(findDOMNode(instance))
                    }}
                    style={{
                        opacity: isDragging ? 0.5 : 1,
                        backgroundColor: active===slot ? activeColor: undefined
                    }}
                    //onClick={() => showBuildingMenu(slot)}
                   // onContextMenu={this.buildingDelete}
                    //onKeyDown={(e) => handleKeyDown(e, slot, building)}
                    tabIndex="0"
                    //onFocus={() => showBuildingMenu(slot)}
                    onContextMenu={(e) => this.contextClick(e, slot)}

                >
                        {building.lvl && <LvlNumber lvl={building.lvl} />}
                        {building.type &&
                            <img
                                src={img}
                                alt={building.name}
                            />
                        }
                </Slot>

        )
    }
}



function mapStateToProps(state, props) {
    return ({
        building: state.base.buildings[props.slot],
        active: state.menu.from,
        faction: state.base.faction
    }) 
}
const mapDispatchToProps = (dispatch) => {
    return {
        switchBuildings: (from, to) => dispatch(switchBuildings(from, to)),
        handleKeyDown: (e, from, building) => dispatch(keyInputBase(e, from, building)),
        removeBuilding: (from) => dispatch(removeBuilding(from))
    }
}


const buildingSource = {
    beginDrag({ slot }) {
        console.log({begin: slot})
        return { from: slot}
    },

    endDrag({ switchBuildings }, monitor, component) {
        console.log("end")
        if (!monitor.didDrop()) {
            return
        }
        const from = monitor.getItem().from
        const to = monitor.getDropResult().slot
        console.log({begin: from, end: to})
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

    drop(props) {
        console.log("drop")
        console.log({props})
        return  props.building
    }
}

BuildingSlot = DropTarget('building', buildingTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(BuildingSlot) 

BuildingSlot = DragSource('building', buildingSource, collect)(BuildingSlot)


export default connect(mapStateToProps, mapDispatchToProps)(BuildingSlot)
