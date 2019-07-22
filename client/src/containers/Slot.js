import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { replaceSlot, switchSlot } from '../store/actions/base';
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
        const { unit } = props;
        event.preventDefault();
        const { key } = event; // get pressed key
        // console.log(event, key, unit);

        //change unit type
        // todo update with keys for army gdi/nod
        if (keys[area][faction].includes(key)) {
            unit.type = key;
            return props.replaceSlot(unit, area);
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
    const [, drag] = useDrag({
        item: { slot, type: area, lvl, bType: type },
    });

    const [, drop] = useDrop({
        accept: area,
        drop: item => {
            const to = {
                type: item.bType,
                lvl: item.lvl,
                slot, // already the new slot
            };
            const from =  item.slot || item.slot === 0 ? { type, slot: item.slot, lvl } : {};
            console.log({ item, from, to });
            // item come from Menu
            ref.current.focus();
            if(item.new) return props.replaceSlot(to, area)
            props.switchSlot(from, to, area);

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
    };
}
const mapDispatchToProps = {
    switchSlot,
    replaceSlot,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Slot);
