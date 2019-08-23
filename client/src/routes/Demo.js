import React, { useRef } from 'react';
import Body from '../style/Body';
import Column from '../style/Column';
import DemoMenu from '../containers/DemoMenu';
import BuildingMenu from '../containers/BuildingMenu';
import ProductionInfo from '../containers/DemoProductionInfo';
import Grid from '../style/Grid';
import Area from '../style/Area';
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
    const { faction, slot, unit, upgrade, fundTib, fundPower, hover } = props;
    const costs = calcBuildingCost(unit);
    const { type, lvl } = unit;

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
            if (!fundTib || !fundPower) return console.log('building costs to high');
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

    function upgradeLvl() {
        if (upgrade && unit.lvl) {
            if (!fundTib || !fundPower) return console.log('building costs to high');
            unit.lvl += 1;
            unit.lvl = !unit.lvl ? 1 : unit.lvl > 65 ? 65 : unit.lvl;
            return props.replace(unit);
            // todo change production + loot
        }
    }

    return (
        <SlotStyle
            ref={ref}
            key={slot}
            slot={slot}
            onKeyDown={handleKeyDown}
            tabIndex="0"
            onClick={upgradeLvl}
        >
            {lvl && <Number>{lvl}</Number>}
            {hover && costs.tib !== 0 && (
                <TibCosts found={fundTib}>{shortenNumber(upgrade * costs.t)}</TibCosts>
            )}
            {hover && costs.power !== 0 && (
                <KrisCosts found={fundPower}>{shortenNumber(upgrade * costs.p)}</KrisCosts>
            )}
            <img src={type ? img : empty} alt={type} />
        </SlotStyle>
    );
}

const mapStateToPropsS = (state, props) => {
    let fundTib =
        state.demo.loot.t - state.demo.upgrade * state.demo.buildings[props.slot].costs.t >= 0;
    let fundPower =
        state.demo.loot.p - state.demo.upgrade * state.demo.buildings[props.slot].costs.p >= 0;
    return {
        unit: state.demo.buildings[props.slot],
        fundTib,
        fundPower,
        upgrade: state.demo.upgrade,
        hover: true,
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
            return <Slot key={slot} slot={slot} faction={faction} />;
        });
    });

function Demo({ faction }) {
    return (
        <Column center>
            <Body large>
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

function mapStateToProps(state) {
    return {
        faction: state.base.faction,
    };
}

export default connect(mapStateToProps)(Demo);
