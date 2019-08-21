import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { calcBuildingCost, calcBuildingProduction } from '../util/production';
import { shortenNumber } from '../util/service';
import tib from '../img/icon/tib_small.png';
import cris from '../img/icon/cris_small.png';
import power from '../img/icon/power_small.png';
import credits from '../img/icon/credits_small.png';

const Cost = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;

    font-weight: 600;
    color: white;
    background-color: rgba(98, 98, 98, 0.66);
`;

const Icon = styled.img`
    width: 1rem;
    height: 1rem;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const Green = styled.div`
    color: #26ff26;
`;

const Blue = styled.div`
    color: #45faff;
`;

function SlotOverlay({ buildings, slot, building }) {
    buildings[slot].lvl += buildings[slot].lvl < 65 ? 1 : 0;
    const cost = calcBuildingCost(building);
    const prod1 = calcBuildingProduction(buildings, slot);
    buildings[slot].lvl -= buildings[slot].lvl < 65 ? 1 : 0;
    const prod2 = calcBuildingProduction(buildings, slot);
    // console.log(prod1, prod2);
    return (
        <Cost>
            <Green>{shortenNumber(cost.t)}</Green>
            <Blue>{shortenNumber(cost.p)}</Blue>
            {prod1.tib !== 0 && (
                <Row>
                    <Icon src={tib} alt="tib" />
                    {shortenNumber(prod1.tib - prod2.tib)}/h
                </Row>
            )}
            {prod1.kris !== 0 && (
                <Row>
                    <Icon src={cris} alt="cris" />
                    {shortenNumber(prod1.kris - prod2.kris)}/h
                </Row>
            )}
            {prod1.power !== 0 && (
                <Row>
                    <Icon src={power} alt="power" />
                    {shortenNumber(prod1.power - prod2.power)}/h
                </Row>
            )}
            {prod1.credits !== 0 && (
                <Row>
                    <Icon src={credits} alt="credits" />
                    {shortenNumber(prod1.credits - prod2.credits)}/h
                </Row>
            )}
        </Cost>
    );
}

export default connect(state => ({ buildings: state.base.buildings, shift: state.menu.shift }))(
    SlotOverlay
);
