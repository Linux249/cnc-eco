import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DropTarget, DragSource } from 'react-dnd';
import { replaceBuilding, switchBuilding } from '../store/actions/base';
import Slot from '../style/BuildingSlot';
import { buildingKeys } from '../util/keys';
import Number from '../style/LvLNumber';

class BuildingSlot extends Component {
    contextClick = e => {
        e.preventDefault();
        const { slot } = this.props.building;
        this.props.replaceBuilding({ slot });
    };

    handleKeyDown = event => {
        const { building } = this.props;
        event.preventDefault();
        const { key } = event; // get pressed key
        console.log(building, key, event)

        //change building type
        if (buildingKeys.includes(key)) {
            building.type = key;
            if (!building.lvl) building.lvl = this.props.lvl;
            return this.props.replaceBuilding(building);
        }
        // + building lvl up
        if (key === '+' && building.lvl) {
            building.lvl += 1;
            building.lvl = !building.lvl ? 1 : building.lvl > 65 ? 65 : building.lvl;
            return this.props.replaceBuilding(building);
        }
        // - building lvl down
        if (key === '-' && building.lvl) {
            building.lvl -= 1;
            building.lvl = !building.lvl ? 1 : building.lvl > 65 ? 65 : building.lvl;
            return this.props.replaceBuilding(building);
        }

        //change lvl through numbers
        const digits = new RegExp('[0-9]');
        if (digits.exec(key) && building.lvl) {
            const rawLvl = `${building.lvl}${key}`;
            const stringLvL =(rawLvl.length > 2 )? rawLvl.slice(1) : rawLvl;
            const lvl = +stringLvL;
            building.lvl = !lvl ? 1 : lvl > 65 ? 65 : lvl;
            console.log({ rawLvl, building });
            return this.props.replaceBuilding(building);
        }
    };

    render() {
        const { unit, faction, connectDragSource, connectDropTarget } = this.props;
        const { type, slot, lvl } = unit;
        const img = type
            ? require('./../img/defense/' + faction + '/' + type + '.png')
            : 'undefined';

        return (
            <Slot
                ref={instance => {
                    connectDropTarget(findDOMNode(instance));
                    connectDragSource(findDOMNode(instance));
                }}
                key={slot}
                onKeyDown={this.handleKeyDown}
                tabIndex="0"
                onContextMenu={this.contextClick}
            >
                {lvl && <Number>{lvl}</Number>}
                {type && <img src={img} alt={type} />}
            </Slot>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        unit: props.slot ? state.base.defense[props.slot] : {},
        faction: state.base.faction,
        lvl: state.menu.lvl,
    };
}
const mapDispatchToProps = {
    replaceBuilding,
    switchBuilding,
};

const buildingSource = {
    beginDrag({ building }) {
        return { building };
    },
    endDrag({ switchBuilding }, monitor) {
        if (!monitor.didDrop()) {
            return;
        }
        const from = monitor.getItem().building;
        const to = monitor.getDropResult().building;
        const tempSlot = from.slot;
        from.slot = to.slot;
        to.slot = tempSlot;
        switchBuilding(from, to);
    },
};

const buildingTarget = {
    drop({ building }) {
        return { building };
    },
};

BuildingSlot = DropTarget('building', buildingTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(BuildingSlot);

BuildingSlot = DragSource('building', buildingSource, connect => ({
    connectDragSource: connect.dragSource(),
}))(BuildingSlot);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingSlot);
