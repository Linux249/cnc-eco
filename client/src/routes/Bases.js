import React from 'react';
import Base from '../components/Base.js';
import BuildingMenu from '../containers/Buildings';
import WorldBaseMenu from '../containers/WorldBaseMenu';
import ChartMenu from '../components/ChartMenu';
import Body from '../style/Body';
import { Share } from '../containers/Share';
import Column from '../style/Column';
import { BaseMenu } from '../containers/BaseMenu';

export default () => (
    <Column center>
        <WorldBaseMenu withBases />
        <Body>
            <BuildingMenu />
            <Base />
            <ChartMenu />
            <div />
            <BaseMenu />
        </Body>
        <Share />
    </Column>
);
