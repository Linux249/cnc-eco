import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { replaceBuilding  } from '../actions/base'
import MenuItem from '../style/BuildingMenuItem'
import { findDOMNode } from 'react-dom';


class BuildingMenuItem extends Component {

    render() {
        const { img, type, connectDragSource } = this.props

        return (
            <MenuItem
                ref={instance => {connectDragSource(findDOMNode(instance))}}
            >
                <img src={img} alt={type} />
                <div>{type}</div>
            </MenuItem>
        )
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


BuildingMenuItem = DragSource('building', buildingSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(BuildingMenuItem)

const mapDispatchToProps = (dispatch) => {
    return {
        replaceBuilding: (building) => dispatch(replaceBuilding(building)),
    }
}

export default connect(null, mapDispatchToProps)(BuildingMenuItem)
