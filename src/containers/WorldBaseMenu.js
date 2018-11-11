import Row from '../style/Row';
import Button from '../style/Button';
import React from 'react';
import { connect } from 'react-redux';

export const WorldBaseMenu = props => {
    const { worlds, bases, playerName } = props;
    return (
        <>
            <Row>
                {playerName}
                {worlds.map((world, i) => (
                    <Button key={i} onClick={() => {}}>
                        {world.worldName}
                    </Button>
                ))}
            </Row>
            bases
            <Row>
                {bases.map((base, i) => (
                    <Button key={i} onClick={() => {}}>
                        {base.name}
                    </Button>
                ))}
            </Row>
        </>
    );
};

const mapStateToProps = state => {
    return {
        playerName: state.player.name,
        worlds: state.player.worlds,
        bases: [],
    };
};

export default connect(mapStateToProps)(WorldBaseMenu);
