import React from 'react';
import BuildingSlot from '../containers/BuildingSlot.js';
import Area from '../style/Area';
import BaseStyle from '../style/Base';
import ProductionInfo from '../containers/ProductionInfo';

const slots = [...Array(8).keys()].map(function(y) {
    return [...Array(9).keys()].map(function(x) {
        const slot = x + y * 9;
        return <BuildingSlot key={slot} slot={slot} />;
    });
});

export default () => (
    <Area>
        <ProductionInfo />
        <BaseStyle>{slots}</BaseStyle>
    </Area>
);
