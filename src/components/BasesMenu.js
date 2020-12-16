import Row from '@/style/Row';
import Button from '@/style/Button';
import React  from 'react';

function BasesMenu({ bases = []}) {
    return (
        <Row wrap>
            {bases.map((base, i) => (
                <Button
                    key={i}
                    // onClick={() => selectBase(i)} active={selectedBase === i}
                >
                    {base.name}
                </Button>
            ))}
        </Row>
    );
}

// export default connect(mapStateToProps, { selectBase: changeBase })(BasesMenu);
export default BasesMenu;
