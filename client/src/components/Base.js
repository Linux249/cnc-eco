import React from 'react';
import Slot from '../containers/Slot';
import Area from '../style/Area';
import Grid from '../style/Grid';
import ProductionInfo from '../containers/ProductionInfo';

const slots = [0, 1, 2, 3, 4, 5, 6, 7].map(function(y) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
        const slot = x + y * 9;
        return <Slot key={slot} slot={slot} area="buildings" />;
    });
});

export default () => (
    <Area>
        <ProductionInfo />
        <Grid rows={4}>{slots}</Grid>
    </Area>
);
