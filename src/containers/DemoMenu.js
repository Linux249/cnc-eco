import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import icon_tib from '../img/icon/icon_tiberium.png';
import icon_cris from '../img/icon/icon_crystal.png';
import icon_power from '../img/icon/icon_power.png';
import icon_credits from '../img/icon/icon_credits.png';
import { shortenNumber } from '../util/service';
import Button from '../style/Button';
import { reset, setLoot, setUpgrade } from '../store/actions/demo';
import Area from '../style/Area';

function useInterval(callback, delay, lock) {
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
        if (delay !== null && !lock) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay, lock]);
}

const Info = styled(Area)`
    width: 100%;
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
`;

const Row = styled.div`
    display: flex;
    justify-content: space-around;
`;

function DemoMenu(props) {
    const { loot, upgrade, prod } = props;

    const [tickCounter, setTickCounter] = useState(0);
    const [upgradeMode, setUpgradeMode] = useState(false);

    const [lock, setLock] = useState(true);
    function setUpgrade(i) {
        // todo
        //  - show mouse as update Button or green background color behind buildings
        //  - show costs over buildings
        !upgradeMode && setUpgradeMode(true);
        upgrade !== i && props.setUpgrade(i);
    }

    // todo army
    //  - let player choose between camps, VP or Bases => other res ratio,
    //  . bases for progress!
    // const [armyLvl, setArmyLvl] = useState(0);
    // const [armyProd, setArmyProd] = useState(0);
    // const [armyCosts, setArmyCosts] = useState(0);

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

    function reset() {
        console.log('reset');
        props.reset();
        setTickCounter(0);
        setLock(true);
    }

    function start() {
        console.log('start');
        setLock(false);
    }

    function stop() {
        console.log('stop');
        setLock(true);
    }

    function skip(t) {
        console.log('skip');
        setTickCounter(tickCounter + t);
        // update total resources
        props.setLoot({
            t: loot.t + t * prod.t,
            k: loot.k + t * prod.k,
            p: loot.p + t * prod.p,
            c: loot.c + t * prod.c,
        });
    }

    useInterval(tick, 1000, lock);

    return (
        <Info>
            <Row>
                <Img src={icon_tib} alt={icon_tib} />
                {shortenNumber(prod.t, 2)}
            </Row>
            <Row>
                <Img src={icon_cris} alt={icon_tib} />
                {shortenNumber(prod.k, 2)}
            </Row>
            <Row>
                <Img src={icon_power} alt={icon_tib} />
                {shortenNumber(prod.p, 2)}
            </Row>
            <Row>
                <Img src={icon_credits} alt={icon_tib} />
                {shortenNumber(prod.c, 2)}
            </Row>
            <Row>
                <Button>+lvl</Button>
                <Button active={upgrade === 1} onClick={() => setUpgrade(1)}>
                    +1
                </Button>
                <Button active={upgrade === 5} onClick={() => setUpgrade(5)}>
                    +5
                </Button>
                <Button active={upgrade === 10} onClick={() => setUpgrade(10)}>
                    +10
                </Button>
            </Row>
            <Row>
                <Button active={!lock} onClick={start}>
                    start
                </Button>
                <Button active={lock} onClick={stop}>
                    stop
                </Button>
                <Button onClick={reset}>reset</Button>
            </Row>
            <Row>
                <Button onClick={() => skip(1)}>skip 1h</Button>
                <Button onClick={() => skip(12)}>skip 12h</Button>
                <Button onClick={() => skip(24)}>skip 1d</Button>
            </Row>
            <Row>{`Ticks: ${tickCounter}`}</Row>
        </Info>
    );
}

export default connect(
    state => ({
        loot: state.demo.loot,
        upgrade: state.demo.upgrade,
        prod: state.demo.prod,
    }),
    { reset, setLoot, setUpgrade }
)(DemoMenu);
