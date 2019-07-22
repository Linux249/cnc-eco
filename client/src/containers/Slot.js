import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { switchSlot } from '../store/actions/base';
import SlotStyle from '../style/BuildingSlot';
import keys from '../util/keys';
import Number from '../style/LvLNumber';
import { useDrag, useDrop } from 'react-dnd';
import imgs from '../img/imgs';

function Slot(props) {
    const { unit, faction, area } = props;
    const { type, slot, lvl } = unit;

    const contextClick = e => {
        e.preventDefault();
        props.switchSlot({ slot: props.slot }, {}, area);
    };

    const handleKeyDown = event => {
        console.log(imgs);
        const { unit } = props;
        event.preventDefault();
        const { key } = event; // get pressed key
        console.log(event, key, unit);

        //change unit type
        // todo update with keys for army gdi/nod
        if (keys[area][faction].includes(key)) {
            unit.type = key;
            if (!unit.lvl) unit.lvl = props.lvl;
            return props.switchSlot(unit, {}, area);
        }
        // + unit lvl up
        if (key === '+' && unit.lvl) {
            unit.lvl += 1;
            unit.lvl = !unit.lvl ? 1 : unit.lvl > 65 ? 65 : unit.lvl;
            return props.switchSlot(unit, {}, area);
        }
        // - unit lvl down
        if (key === '-' && unit.lvl) {
            unit.lvl -= 1;
            unit.lvl = !unit.lvl ? 1 : unit.lvl > 65 ? 65 : unit.lvl;
            return props.switchSlot(unit, {}, area);
        }

        //change lvl through numbers
        const digits = new RegExp('[0-9]');
        if (digits.exec(key) && unit.lvl) {
            const rawLvl = `${unit.lvl}${key}`;
            const stringLvL = rawLvl.length > 2 ? rawLvl.slice(1) : rawLvl;
            const lvl = +stringLvL;
            unit.lvl = !lvl ? 1 : lvl > 65 ? 65 : lvl;
            console.log({ rawLvl, unit });
            return props.switchSlot(unit, {}, area);
        }
    };

    const img = imgs[area][faction][type];
    const ref = useRef(null);
    const [collectedPropsDrag, drag] = useDrag({
        item: { slot, type: area, lvl, bType: type },
        begin: monitor => {
            console.log('begin');
            console.log(monitor);
            console.log(collectedPropsDrag);
            console.log('from', { type, slot, lvl });
        },
    });

    const [collectedPropsDrop, drop] = useDrop({
        accept: area,
        drop: (item, monitor) => {
            const from = {
                type: item.bType,
                lvl: item.lvl,
                slot, // already the new slot
            };
            console.log('drop');
            console.log(item);
            console.log(monitor);
            console.log(collectedPropsDrop);
            console.log('to', { type, slot, lvl });
            console.log({ from });
            props.switchSlot(from, { type, slot: item.slot, lvl }, area);
            console.log(ref)
            ref.current.focus()
        },
    });

    drop(drag(ref));

    return (
        <SlotStyle
            ref={ref}
            key={slot}
            slot={slot}
            onKeyDown={handleKeyDown}
            tabIndex="0"
            onContextMenu={contextClick}
        >
            {lvl && <Number>{lvl}</Number>}
            {type && <img src={img} alt={type} />}
        </SlotStyle>
    );
}

function mapStateToProps(state, props) {
    return {
        unit: state.base[props.area][props.slot],
        faction: state.base.faction,
        lvl: state.menu.lvl,
    };
}
const mapDispatchToProps = {
    switchSlot,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Slot);
