/**
 * Created by Bombassd on 03.01.2017.
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import icon_tib from '../img/icon/icon_tiberium.png';
import icon_cris from '../img/icon/icon_crystal.png';
import icon_power from '../img/icon/icon_power.png';
import icon_credits from '../img/icon/icon_credits.png';
import { shortenNumber } from '../util/service';
import { calcBuildingCost, calcProduction } from '../util/production';
import Button from '../style/Button';
import { reset, setLoot, toogleUpgrade } from '../store/actions/demo';
import Area from '../style/Area';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}


const Info = styled(Area)`
    width: 100%;
    //    position: relative ;
    // display: flex;
    // flex-flow: column;
    //justify-content: space-between;
    //align-content: space-around;
    // flex-wrap: wrap;

    //margin-bottom: 10px;
    //
    //& > div > img {
    //    margin-right: 5px;
    //}
    // & > div {
    //    display: flex;
    //    align-items: center;
    //    //flex: 1;
    //}
    //
    //& > div:hover {
    //    box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
    //}
`;

const rotate = keyframes`
    from {top: -10px; left: 0; visibility: visible;}
    to {top: 30px; left: 0; visibility: hidden;}
    /*0% {top: -10px; left: 0;}

    100% {top: 30px; left: 0;}*/
`;

const Diff = styled.div`
    //position: absolute;
    display: inline-block;
    animation: ${rotate} 2s ease-in-out;
    padding: 0 1rem;
    font-size: 0.8rem;

    color: ${p => (p.positiv ? 'green' : '#e06161')};
`;

const Img = styled.img`
    height: 24px;
    margin-right: 5px;
    //position: absolute;
    // display: inline-block;
    // animation: ${rotate} 2s ease-in-out;
    // padding: 0 1rem;
    // font-size: 0.8rem;
    //
    // color: ${p => (p.positiv ? 'green' : '#e06161')};
`;

const Row = styled.div`
    display: flex;
    justify-content: space-around;
`;

function DemoMenu(props) {
    // const [state, action] = useDemoState();
    const { buildings, loot, upgrade, prod } = props;

    const [timerId, setTimerId] = useState(0);
    const [tickCounter, setTickCounter] = useState(0);
    // const [buildings, setBuildings] = useState(state.buildings);

    const [upgradeMode, setUpgradeMode] = useState(0);
    function toogleUpgradeMode() {
        // todo
        //  - show mouse as update Button or green background color behind buildings
        //  - show costs over buildings
        props.toogleUpgrade()
    }

    // todo army
    //  - let player choose between camps, VP or Bases => other res ratio,
    //  . bases for progress!
    // const [armyLvl, setArmyLvl] = useState(0);
    // const [armyProd, setArmyProd] = useState(0);
    // const [armyCosts, setArmyCosts] = useState(0);

    // const [loot, setLoot] = useState({ t: 0, k: 0, p: 0, c: 0 });
    // const [prod, setProd] = useState({ t: 0, k: 0, p: 0, c: 0 });

    function tick() {
        console.log('tick');
        setTickCounter(tickCounter + 1);
        // update total resources
        props.setLoot({
            t: loot.t + prod.t,
            k: loot.k + prod.k,
            p: loot.p + prod.p,
            c: loot.c + prod.c,
        });
        if (tickCounter === 10) {
            // todo update data to server
            // console.log('update data to server');
        }
    }
    useInterval(tick, 1000);

    // after building levels up
    function updateProd() {
        console.log('updateProd');
        // window.requestIdleCallback(() => {
        //     const newProd = calcProduction(buildings);
        //     // todo diff to old production
        //     setProd({ t: newProd.tib, k: newProd.kris, p: newProd.power, c: newProd.credits });
        // });
    }

    function reset() {
        console.log('reset');
        // reset prod
        props.setLoot({ t: 0, k: 0, p: 0, c: 0 });
        //setProd({ t: 0, k: 0, p: 0, c: 0 });

        // reset army
        // setArmyLvl(0);
        // setArmyProd(0);

        // reset base
        props.reset();
        setTickCounter(0);
    }

    // function upgradeArmy() {
    //     // reduce cris+power by amryCosts
    //
    //     // update Army prod via faktor?
    //     setArmyProd(armyProd + 100);
    //
    //     // update
    //
    //     // update army lvl
    //     setArmyLvl(armyLvl + 1);
    // }


    return (
        <Info>
            <Row>
                <Img src={icon_tib} alt={icon_tib} />
                {shortenNumber(loot.t, 2)}
                <Diff>{prod.t}</Diff>
            </Row>
            <Row>
                <Img src={icon_cris} alt={icon_tib} />
                {shortenNumber(loot.k, 2)}
                <Diff positiv>{prod.k}</Diff>
            </Row>
            <Row>
                <Img src={icon_power} alt={icon_tib} />
                {shortenNumber(loot.p, 2)}
                <Diff positiv>{prod.p}</Diff>
            </Row>
            <Row>
                <Img src={icon_credits} alt={icon_tib} />
                {shortenNumber(loot.c, 2)}
                <Diff positiv>{prod.c}</Diff>
            </Row>
            <Row>
                <Button onClick={() => reset()}>reset</Button>
                <Button onClick={() => updateProd()}>prod</Button>
                <Button active={upgrade} onClick={() => toogleUpgradeMode()}>
                    update
                </Button>
            </Row>
            {/*<Row>*/}
            {/*    <div>Army Icon</div>*/}
            {/*    {armyLvl}*/}
            {/*    {shortenNumber(armyProd, 2)}*/}
            {/*    <Button onClick={() => upgradeArmy()}>+1 {armyCosts}</Button>*/}
            {/*</Row>*/}

            {/*<Button onClick={}>Restart</Button>*/}
            <Row>{`Ticks: ${tickCounter}`}</Row>
        </Info>
    );
}

export default connect(
    state => ({ buildings: state.demo.buildings, loot: state.demo.loot, upgrade: state.demo.upgrade, prod: state.demo.prod }),
    { reset, setLoot, toogleUpgrade, }
)(DemoMenu);
