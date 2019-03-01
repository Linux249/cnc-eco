import React from 'react';
import Base from '../components/Base.js';
import BuildingMenu from '../containers/Buildings';
import WorldBaseMenu from '../containers/WorldBaseMenu';
import Menu from '../components/Menu';
import Body from '../style/Body';
import { Share } from '../containers/Share';

export default () => (
    <>
        <WorldBaseMenu withBases/>
        <Share></Share>
        <Body>
            <BuildingMenu />
            <Base />
            <Menu />
        </Body>
    </>
);
