import React from 'react';
import Base from '../components/Base.js';
import BuildingMenu from '../containers/Buildings';
import WorldBaseMenu from '../containers/WorldBaseMenu';
import Menu from '../components/Menu';
import Body from '../style/Body';

export default () => (
    <>
        <WorldBaseMenu withBases/>
        <Body>
            <BuildingMenu />
            <Base />
            <Menu />
        </Body>
    </>
);
