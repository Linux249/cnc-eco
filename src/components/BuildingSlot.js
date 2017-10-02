import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux' 
import { LvlNumber } from './LvlNumber'
import { keyInputBase} from './../actions/buildings'
import { DropTarget, DragSource } from 'react-dnd'
import {removeBuilding, replaceBuilding } from '../actions/base'
import Slot from '../style/BuildingSlot'



const activeColor = '#b6b6b6'

class BuildingSlot extends Component {


    contextClick = (e, building) => {
        e.preventDefault()
        const { slot } = building
        this.props.replaceBuilding({slot})
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
                    onContextMenu={(e) => this.contextClick(e, building)}

                >
                        {building.lvl && <LvlNumber lvl={building.lvl} />}
                        {(building.slot || building.slot === 0)&& <LvlNumber lvl={building.slot} />}
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
        replaceBuilding: (building) => dispatch(replaceBuilding(building)),
        handleKeyDown: (e, from, building) => dispatch(keyInputBase(e, from, building)),
    }
}


const buildingSource = {
    beginDrag({building}) {
        console.log("begin")
        return { building }
    },
    endDrag({ replaceBuilding }, monitor) {
        if (!monitor.didDrop()) {
            return
        }
        const from = monitor.getItem().building
        const to = monitor.getDropResult().building
        console.log({from, to})
        if(from.slot) {
            const tempSlot = from.slot
            from.slot = to.slot
            to.slot = tempSlot
            replaceBuilding(from)
            replaceBuilding(to)
        } else {
            from.slot = to.slot
            replaceBuilding(from)
        }

    }
}

const buildingTarget = {
    drop({building}) {
        return {building}
    }
}

BuildingSlot = DropTarget('building', buildingTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(BuildingSlot) 

BuildingSlot = DragSource('building', buildingSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(BuildingSlot)


export default connect(mapStateToProps, mapDispatchToProps)(BuildingSlot)
