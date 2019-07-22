import React from 'react';
import Area from '../style/Area';
import DefenseStyle from '../style/Defense';
import Slot from '../containers/Slot';

const slots = [0, 1, 2, 3, 4, 5, 6, 7].map(function(y) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
        const slot = x + y * 9;
        return <Slot key={slot} slot={slot} area={'defense'} />;
    });
});

export default () => (
    <Area>
        <DefenseStyle>{slots}</DefenseStyle>
    </Area>
);
