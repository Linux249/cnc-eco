import React from 'react';
import Base from '../components/Base.js';
import BasesMenuRight from '../components/BasesMenuRight';
import BuildingMenu from '../containers/BuildingMenu';
import BasesMenu from '../containers/BasesMenu';
// import BestBuildingsToUpgrade from '../components/BestBuildingsToUpgrade';
import Body from '../style/Body';
import Column from '../style/Column';
import Defense from '../components/Defense';
import Army from '../components/Army';

export default () => (
    <Column center>
        <BasesMenu />
        <Body>
            <BuildingMenu area="buildings" />
            <Base />
            <BasesMenuRight />
            <BuildingMenu area="defense" />
            <Defense />
            <div />
            <BuildingMenu area="army" />
            <Army />
            <div />
            <div />
            {/*<BestBuildingsToUpgrade />*/}
        </Body>
    </Column>
);
