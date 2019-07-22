import React from 'react';
import Area from '../style/Area';
import ArmyStyle from '../style/Army';
import Slot from '../containers/Slot';

const slots = [0, 1, 2, 3].map(function(y) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
        const slot = x + y * 9;
        return <Slot key={slot} slot={slot} area="army" />;
    });
});

export default () => (
    <Area>
        <ArmyStyle>{slots}</ArmyStyle>
    </Area>
);
