import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux' 
import { LvlNumber } from './LvlNumber'
import { DropTarget, DragSource } from 'react-dnd'
import {removeBuilding, replaceBuilding } from '../actions/base'
import Slot from '../style/BuildingSlot'
import { buildingKeys } from './../util/buildings'




class BuildingSlot extends Component {


    contextClick = (e, building) => {
        e.preventDefault()
        const { slot } = building
        this.props.replaceBuilding({slot})
    }

    handleKeyDown = (e, building) => {
        e.preventDefault()
        const { key } = e
        console.log("key down")
        console.log(key)
        if(buildingKeys.includes(key)) {
            building.type = key
            this.props.replaceBuilding(building)

        }
    }

    render() {
        const {
            building,
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
                    onKeyDown={(e) => this.handleKeyDown(e, building)}
                    tabIndex="0"
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
        faction: state.base.faction
    }) 
}
const mapDispatchToProps = (dispatch) => {
    return {
        replaceBuilding: (building) => dispatch(replaceBuilding(building)),
    }
}


const buildingSource = {
    beginDrag({building}) {
        return { building }
    },
    endDrag({ replaceBuilding }, monitor) {
        if (!monitor.didDrop()) {
            return
        }
        const from = monitor.getItem().building
        const to = monitor.getDropResult().building
        if(from.slot !== undefined) {
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
