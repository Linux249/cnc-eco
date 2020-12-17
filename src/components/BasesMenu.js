import { connect } from 'react-redux';
import Row from '@/style/Row';
import Button from '@/style/Button';
import React, { useEffect, useState } from 'react';
import { changeBase } from '../store/actions/player';

function BasesMenu({ bases = [], selectBase }) {
    const [selectedBase, setSelectedBase] = useState(0);

    function updateBase(base, i) {
        console.log('f: updateBase', i, bases);
        setSelectedBase(i);
        selectBase(base, i);
    }

    useEffect(() => {
        console.log('mount: BasesMenu', selectedBase, bases);
        selectBase(bases[0], 0);
    }, []);
    return (
        <Row wrap>
            {bases.map((base, i) => (
                <Button
                    key={i}
                    onClick={() => updateBase(base, i)} active={selectedBase === i}
                >
                    {base.name}
                </Button>
            ))}
        </Row>
    );
}

export default connect(null, { selectBase: changeBase })(BasesMenu);
// export default BasesMenu;
