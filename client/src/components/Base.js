import React from 'react';
import BuildingSlot from '../containers/Slot';
import Area from '../style/Area';
import BaseStyle from '../style/Base';
import ProductionInfo from '../containers/ProductionInfo';

const slots = [0, 1, 2, 3, 4, 5, 6, 7].map(function(y) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
        const slot = x + y * 9;
        return <BuildingSlot key={slot} slot={slot} area="buildings"/>;
    });
});

export default () => (
    <Area>
        <ProductionInfo />
        <BaseStyle>{slots}</BaseStyle>
    </Area>
);
