import React from 'react';
import Area from '../style/Area';
import ArmyStyle from '../style/Army';
import ArmySlot from './Slot';

const slots = [0, 1, 2, 3].map(function(y) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
        const slot = x + y * 9;
        return <ArmySlot key={slot} slot={slot} area="army" />;
    });
});

export default () => (
    <Area>
        <ArmyStyle>{slots}</ArmyStyle>
    </Area>
);
