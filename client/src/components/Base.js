import React, { useEffect } from 'react';
import Slot from '../containers/Slot';
import Grid from '../style/Grid';
import { store } from '../pages/index';
import { setShiftPressed } from '../store/actions/menu';
import Area from '../style/Area';
import CountStructure from '../containers/CountStructure';

const slots = [0, 1, 2, 3, 4, 5, 6, 7].map(function(y) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
        const slot = x + y * 9;
        return <Slot key={slot} slot={slot} area="buildings" />;
    });
});

export default () => {
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key === 'Shift' && !store.getState().menu.shift) {
            console.log(key);
            store.dispatch(setShiftPressed(true));
        }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        if (key === 'Shift') {
            console.log('downs');
            store.dispatch(setShiftPressed(false));
        }
    };

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return (
        <Area>
            <CountStructure area='buildings' />
            <Grid rows={8}>{slots}</Grid>
        </Area>
    );
};
