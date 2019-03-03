import React from 'react';
import Base from '../components/Base.js';
import ChartMenu from '../components/ChartMenu';
import BuildingMenu from '../containers/Buildings';
import BasesMenu from '../containers/BasesMenu';
import Share from '../containers/Share';
import BestBuildingsToUpgrade from '../containers/BestBuildingsToUpgrade';
import Body from '../style/Body';
import Column from '../style/Column';

export default () => (
    <Column center>
        <BasesMenu />
        <Body>
            <BuildingMenu />
            <Base />
            <ChartMenu />
            <div />
            <BestBuildingsToUpgrade />
        </Body>
        <Share />
    </Column>
);
