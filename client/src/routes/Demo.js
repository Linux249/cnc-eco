import React, { useRef } from 'react';
import Body from '../style/Body';
import Column from '../style/Column';
import DemoMenu from '../containers/DemoMenu';
import BuildingMenu from '../containers/BuildingMenu';
import ProductionInfo from '../containers/ProductionInfo';
import Grid from '../style/Grid';
import Area from '../style/Area';
// import Slot from '../containers/Slot';
import keys from '../util/keys';
import imgs from '../img/imgs';
import { useDrag, useDrop } from 'react-dnd';
import SlotStyle from '../style/BuildingSlot';
import Number from '../style/LvLNumber';
import empty from '../img/empty.png';
import { replace } from '../store/actions/demo';
import { connect } from 'react-redux';
import { calcBuildingCost } from '../util/production';
import { shortenNumber } from '../util/service';
import styled from 'styled-components';

const TibCosts = styled.div`
    position: absolute;
    top: 75%;
    left: 2px;
    z-index: 10;

    font-weight: 600;

    color: ${p => (p.found ? 'green' : 'red')};
`;

const KrisCosts = styled(TibCosts)`
    left: 50%;
`;

function SlotC(props) {
    const { faction, slot, unit, upgrade, fundTib, fundKris } = props;
    const costs = calcBuildingCost(state.demo.buildings[props.slot])
    // const [, actions] = useDemoState();
    // const unit = actions.demo.getUnit(slot);
    const { type, lvl } = unit;
    // console.log({costs})
    //costs.power = shortenNumber(costs.power)
    //costs.tib =  shortenNumber(costs.tib)
    // console.log({costs})
    const contextClick = e => {
        e.preventDefault();
        props.replace({ slot: props.slot });
    };

    const handleKeyDown = event => {
        event.preventDefault();
        const { key } = event; // get pressed key
        // console.log(event, key, unit);

        //change unit type
        if (keys['buildings'][faction].includes(key)) {
            unit.type = key;
            if (key !== 'c' || key !== 't') unit.lvl = 1;
            return props.replace(unit);
        }
        // + unit lvl up
        if (key === '+' && unit.lvl) {
            unit.lvl += 1;
            unit.lvl = !unit.lvl ? 1 : unit.lvl > 65 ? 65 : unit.lvl;
            return props.replace(unit);
            // todo change production + loot
        }
    };

    const img = imgs['buildings'][faction][type];
    const ref = useRef(null);
    const [, drag] = useDrag({
        item: { slot, type: 'buildings', lvl, bType: type },
    });

    const [, drop] = useDrop({
        accept: 'buildings',
        drop: item => {
            const to = {
                type: item.bType,
                lvl: item.lvl || (item.bType !== 't' && item.bType !== 'c' && 1),
                slot, // already the new slot
            };
            const from = item.slot && item.type ? { type, slot: item.slot, lvl } : {};
            console.log({ item, from, to });
            // item come from Menu
            ref.current.focus();
            if (item.new) return props.replace(to);
            props.replace(from);
            props.replace(to);
            // todo change production
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
            {upgrade && <TibCosts found={fundTib}>{shortenNumber(costs.tib)}</TibCosts>}
            {upgrade && <KrisCosts found={fundKris}>{shortenNumber(costs.power)}</KrisCosts>}
            <img src={type ? img : empty} alt={type} />
        </SlotStyle>
    );
}

const mapStateToPropsS = (state, props) => {
    const costs = calcBuildingCost(state.demo.buildings[props.slot])
    return {
        unit: state.demo.buildings[props.slot],
        fundTib: true,
        fundKris: true,
    };
};

const Slot = connect(
    mapStateToPropsS,
    { replace }
)(SlotC);

const slots = (faction, upgrade) =>
    [0, 1, 2, 3, 4, 5, 6, 7].map(function(y) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
            const slot = x + y * 9;
            return <Slot key={slot} slot={slot} faction={faction} upgrade={upgrade} />;
        });
    });

function Demo({ faction }) {
    return (
        <Column center>
            <Body>
                <BuildingMenu area="buildings" />
                <Area>
                    <ProductionInfo />
                    <Grid>{slots(faction, true)}</Grid>
                </Area>
                <DemoMenu />
            </Body>
        </Column>
    );
}

function mapStateToProps(state, props) {
    return {
        faction: state.base.faction,
    };
}

export default connect(mapStateToProps)(Demo);
