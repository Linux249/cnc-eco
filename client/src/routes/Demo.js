import React from 'react';
import BasesMenu from '../containers/BasesMenu';
import Body from '../style/Body';
import Column from '../style/Column';
import BuildingSlot from '../containers/BuildingSlot.js';
import Area from '../style/Area';
import BaseStyle from '../style/Base';
import ProductionInfo from '../containers/ProductionInfo';
import DemoMenu from '../containers/DemoMenu';

const slots = [0, 1, 2, 3, 4, 5, 6, 7].map(function(y) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
        const slot = x + y * 9;
        return <BuildingSlot key={slot} slot={slot} />;
    });
});

export default () => (
    <Column center>
        <BasesMenu />
        <Body>
            <div />
            <Area>
                <ProductionInfo />
                <BaseStyle>{slots}</BaseStyle>
            </Area>
            <DemoMenu />
        </Body>
    </Column>
);
