import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { LvlNumber } from '../components/LvlNumber';
import { DropTarget, DragSource } from 'react-dnd';
import { replaceBuilding } from '../store/actions/base';
import Slot from '../style/BuildingSlot';
import { buildingKeys } from '../util/buildings';

class BuildingSlot extends Component {
    contextClick = (e, building) => {
        e.preventDefault();
        const { slot } = building;
        this.props.replaceBuilding({ slot });
    };

    handleKeyDown = (event, building) => {
        event.preventDefault();
        const { key } = event; // get pressed key

        //change building
        if (buildingKeys.includes(key)) {
            building.type = key;
            if (!building.lvl) building.lvl = this.props.lvl;
            this.props.replaceBuilding(building);
        }
        //change lvl up
        if (key === '+' && building.lvl) {
            building.lvl += 1;
            building.lvl = !building.lvl ? 1 : building.lvl > 65 ? 65 : building.lvl;
            this.props.replaceBuilding(building);
        }
        //change lvl down
        if (key === '-' && building.lvl) {
            building.lvl -= 1;
            building.lvl = !building.lvl ? 1 : building.lvl > 65 ? 65 : building.lvl;
            this.props.replaceBuilding(building);
        }

        //change lvl through numbers
        const digits = new RegExp('[0-9]');
        if (digits.exec(key) && building.lvl) {
            const rawLvl = `${building.lvl}${key}`;
            const lvl = Number(rawLvl.length > 2 ? rawLvl.slice(1) : rawLvl);
            building.lvl = !lvl ? 1 : lvl > 65 ? 65 : lvl; //check: if lvl not exists (=0)return 1 - else check if>65
            console.log({ rawLvl, building });
            this.props.replaceBuilding(building);
        }
    };

    render() {
        const {
            building,
            faction,
            connectDragSource,
            connectDropTarget,
            // isDragging,
        } = this.props;
        const { type, slot, lvl } = building;
        let img = 'undefined';
        if (type) {
            img = require('./../img/buildings/' + faction + '/' + type + '.png');
        }

        return (
            <Slot
                ref={instance => {
                    connectDropTarget(findDOMNode(instance));
                    connectDragSource(findDOMNode(instance));
                }}
                key={slot}
                onKeyDown={e => this.handleKeyDown(e, building)}
                tabIndex="0"
                onContextMenu={e => this.contextClick(e, building)}
            >
                {lvl && <LvlNumber lvl={lvl} />}
                {/*{(building.slot || building.slot === 0)&& <LvlNumber lvl={building.slot} />}*/}
                {type && <img src={img} alt={type} />}
            </Slot>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        building: state.base.buildings[props.slot],
        faction: state.base.faction,
        lvl: state.menu.lvl,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        replaceBuilding: building => dispatch(replaceBuilding(building)),
    };
};

const buildingSource = {
    beginDrag({ building }) {
        return { building };
    },
    endDrag({ replaceBuilding }, monitor) {
        if (!monitor.didDrop()) {
            return;
        }
        const from = monitor.getItem().building;
        const to = monitor.getDropResult().building;
        if (from.slot !== undefined) {
            const tempSlot = from.slot;
            from.slot = to.slot;
            to.slot = tempSlot;
            replaceBuilding(from);
            replaceBuilding(to);
        } else {
            from.slot = to.slot;
            replaceBuilding(from);
        }
    },
};

const buildingTarget = {
    drop({ building }) {
        return { building };
    },
};

BuildingSlot = DropTarget('building', buildingTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(BuildingSlot);

BuildingSlot = DragSource('building', buildingSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(BuildingSlot);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingSlot);
