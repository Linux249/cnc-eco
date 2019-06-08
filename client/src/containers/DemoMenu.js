/**
 * Created by Bombassd on 03.01.2017.
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { shortenNumber } from '../util/service';
import { calcBuildingCost, calcProduction } from '../util/production';
import icon_tib from '../img/icon/icon_tiberium.png';
import icon_cris from '../img/icon/icon_crystal.png';
import icon_power from '../img/icon/icon_power.png';
import icon_credits from '../img/icon/icon_credits.png';
import styled, { keyframes } from 'styled-components';
import Button from '../style/Button';
import DemoLayouts from './DemoLayouts';

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

const Info = styled.div`
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
    const [timerId, setTimerId] = useState(0);
    const [tickCounter, setTickCounter] = useState(0);
    const [buildings, setBuildings] = useState(props.buildings);

    const [upgradeMode, setUpgradeMode] = useState(0);
    function toogleUpgradeMode() {
        // todo
        //  - show mouse as update Button or green background color behind buildings
        //  - show costs over buildings
        setUpgradeMode(!upgradeMode);
    }

    // todo army
    //  - let player choose between camps, VP or Bases => other res ratio,
    //  . bases for progress!
    const [armyLvl, setArmyLvl] = useState(0);
    const [armyProd, setArmyProd] = useState(0);
    const [armyCosts, setArmyCosts] = useState(0);

    const [prodT, setProdT] = useState(0);
    const [prodK, setProdK] = useState(0);
    const [prodP, setProdP] = useState(0);
    const [prodC, setProdC] = useState(0);

    const [t, setT] = useState(0);
    const [k, setK] = useState(0);
    const [p, setP] = useState(0);
    const [c, setC] = useState(0);

    function tick() {
        console.log('tick');
        setTickCounter(tickCounter + 1);
        // update total resources
        setT(t + prodT);
        setK(k + prodK);
        setP(p + prodP);
        setC(c + prodC);
        if (tickCounter === 10) {
            // todo update data to server
            console.log('update data to server');
            setTickCounter(0);
        }
    }
    useInterval(tick, 500);

    // after building levels up
    function updateProd() {
        console.log('updateProd');
        window.requestIdleCallback(() => {
            const newProduction = calcProduction(props.buildings);
            // todo diff to old production
            setProdT(newProduction.tib + armyProd);
            setProdK(newProduction.kris + armyProd);
            setProdP(newProduction.power + armyProd);
            setProdC(newProduction.credits + armyProd);
        });
    }

    useEffect(() => {
        // console.log(buildings);
        if (buildings !== props.buildings) {
            console.warn('DIFFERENT BUILDINGS');
            buildings.forEach((b, i) => {
                // building changed
                if (b !== props.buildings[i] && upgradeMode) {
                    console.error('new building');
                    console.log(b);
                    const cost = calcBuildingCost(props.buildings[i])
                    console.log(cost)
                    setT(t - cost.tib)
                    setP(p - cost.power)

                    // todo calc buildings costs and subs from counter

                }
            });
             updateProd();
            // update for comparison with next props
            setBuildings(props.buildings);
        }
    }, [props.buildings]);

    function reset() {
        console.log('reset')
        // reset prod
        setProdT(0);
        setT(0)
        setProdK(0);
        setK(0)
        setProdP(0);
        setP(0)
        setProdC(0);
        setC(0)

        // reset army
        setArmyLvl(0);
        setArmyProd(0);

        // reset base
    }

    function upgradeArmy() {
        // reduce cris+power by amryCosts

        // update Army prod via faktor?
        setArmyProd(armyProd + 100);

        // update

        // update army lvl
        setArmyLvl(armyLvl + 1);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.buildings !== this.props.buildings)
    //         window.requestIdleCallback(() =>
    //             this.setState(({ production }) => {
    //                 const newProduction = calcProduction(this.props.buildings);
    //                 const diff = {
    //                     tib: shortenNumber(newProduction.tib - production.tib, 2),
    //                     kris: shortenNumber(newProduction.kris - production.kris, 2),
    //                     power: shortenNumber(newProduction.power - production.power, 2),
    //                     credits: shortenNumber(newProduction.credits - production.credits, 2),
    //                 };
    //                 return {
    //                     diff,
    //                     production: newProduction,
    //                 };
    //             })
    //         );
    // }

    return (
        <Info>
            <Row>
                <Img src={icon_tib} alt={icon_tib} />
                {shortenNumber(t, 2)}
                <Diff>{prodT}</Diff>
            </Row>
            <Row>
                <Img src={icon_cris} alt={icon_tib} />
                {shortenNumber(k, 2)}
                <Diff positiv>{prodK}</Diff>
            </Row>
            <Row>
                <Img src={icon_power} alt={icon_tib} />
                {shortenNumber(p, 2)}
                <Diff positiv>{prodP}</Diff>
            </Row>
            <Row>
                <Img src={icon_credits} alt={icon_tib} />
                {shortenNumber(c, 2)}
                <Diff positiv>{prodC}</Diff>
            </Row>
            <Row>
                <Button onClick={() => reset()}>reset</Button>
                <Button onClick={() => updateProd()}>prod</Button>
                <Button  active={upgradeMode} onClick={() => toogleUpgradeMode()}>update</Button>
            </Row>
            <Row>
                <div>Army Icon</div>
                {armyLvl}
                {shortenNumber(armyProd, 2)}
                <Button onClick={() => upgradeArmy()}>+1 {armyCosts}</Button>
            </Row>

            <DemoLayouts reset={reset}/>
        </Info>
    );
}
function mapStateToProps(state) {
    return {
        buildings: state.base.buildings,
    };
}

export default connect(mapStateToProps)(DemoMenu);
