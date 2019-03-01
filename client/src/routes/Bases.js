import React from 'react';
import Base from '../components/Base.js';
import BuildingMenu from '../containers/Buildings';
import WorldBaseMenu from '../containers/WorldBaseMenu';
import Menu from '../components/Menu';
import Body from '../style/Body';
import { Share } from '../containers/Share';
import Column from '../style/Column';

export default () => (
    <Column center>
        <WorldBaseMenu withBases/>
        <Body>
            <BuildingMenu />
            <Base />
            <Menu />
        </Body>
        <Share></Share>
    </Column>
);
