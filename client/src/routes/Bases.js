import React from 'react';
import Base from '../components/Base.js';
import ChartMenu from '../components/ChartMenu';
import BuildingMenu from '../containers/BuildingMenu';
import BasesMenu from '../containers/BasesMenu';
import Share from '../containers/Share';
import BestBuildingsToUpgrade from '../containers/BestBuildingsToUpgrade';
import Body from '../style/Body';
import Column from '../style/Column';
import Defense from '../containers/Defense';
import Army from '../containers/Army';

export default () => (
    <Column center>
        <BasesMenu />
        <Body>
            <BuildingMenu area="buildings" />
            <Base />
            <ChartMenu />
            <BuildingMenu area="defense" />
            <Defense />
            <div />
            <BuildingMenu area="army" />
            <Army />
            <div />
            <div />
            <BestBuildingsToUpgrade />
        </Body>
        <Share />
    </Column>
);
