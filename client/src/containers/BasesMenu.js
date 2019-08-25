import Row from '../style/Row';
import Button from '../style/Button';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeBase } from '../store/actions/player';

function BasesMenu({ bases, selectedBase, selectBase }) {
    useEffect(function() {
        bases.length && selectBase(selectedBase);
    }, []);

    return (
        <Row wrap>
            {bases.map((base, i) => (
                <Button key={i} onClick={() => selectBase(i)} active={selectedBase === i}>
                    {base.name}
                </Button>
            ))}
        </Row>
    );
}

const mapStateToProps = state => {
    return {
        selectedBase: state.player.selectedBase,
        bases: state.player.bases,
    };
};

export default connect(
    mapStateToProps,
    { selectBase: changeBase }
)(BasesMenu);
