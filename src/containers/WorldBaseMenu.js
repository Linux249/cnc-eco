import Row from '../style/Row';
import Button from '../style/Button';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeWorld } from '../store/actions/player';

const DropDownAnchor = styled.div`
    position: relative;
`;

const DropDownArea = styled.div`
    position: absolute;
    top: 2rem;
    left: 0;

    background-color: red;
`;

class WorldBaseMenu extends Component {
    state = {
        showWorld: false,
    };

    toggleShowWorld = () => {
        this.setState(({ showWorld }) => ({ showWorld: !showWorld }));
    };

    render() {
        const { worlds, world, bases, playerName, selectedWorld, selectWorld } = this.props;
        const { showWorld } = this.state;
        return (
            <>
                <Row>
                    {playerName}
                    {showWorld && (
                        <DropDownAnchor>
                            <DropDownArea>
                                {worlds.map(w => (
                                    <Button onClick={() => selectWorld(w)}>{w.worldName}</Button>
                                ))}
                            </DropDownArea>
                        </DropDownAnchor>
                    )}
                    {world && (
                        <Button onClick={this.toggleShowWorld} active>
                            {world.worldName}
                        </Button>
                    )}
                    <Row>
                        {bases.map((base, i) => (
                            <Button key={i} onClick={() => {}}>
                                {base.name}
                            </Button>
                        ))}
                    </Row>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => {
    const world = state.player.worlds[0];
    return {
        selectedWorld: state.player.selectedWorld,
        playerName: state.player.name,
        worlds: state.player.worlds,
        bases: state.player.bases,
        world,
    };
};

export default connect(
    mapStateToProps,
    { selectWorld: changeWorld }
)(WorldBaseMenu);
