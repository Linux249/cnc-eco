import React from 'react';
import Area from '../style/Area';
import Button from '../style/Button';
import { connect } from 'react-redux';
import { replaceAllBase, replaceBaseFromUrl } from '../store/actions/base';

function DemoLayouts(props) {
    function restart() {
        console.log('restart');
        props.reset();
        const buildings = [
            ...'..........tt.cc................t.t........t...c....t..cc..c.............',
        ].map((s, i) => {
            const slot = {
                slot: i,
            };
            if (s !== '.') slot.type = s;
            return slot;
        });

        const base = {
            ...props.base,
            buildings,
        };
        props.newBase(base);
    }

    return (
        <Area>
            <Button onClick={restart}>Restart</Button>
        </Area>
    );
}

export default connect(
    ({ base }) => ({ base }),
    { newBase: replaceAllBase }
)(DemoLayouts);
