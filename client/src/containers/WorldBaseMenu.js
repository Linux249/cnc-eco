import Row from '../style/Row';
import Button from '../style/Button';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeBase, changeWorld } from '../store/actions/player';

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

    handleSelectWorld = world => {
        this.props.selectWorld(world);
        this.toggleShowWorld();
    };

    render() {
        const {
            worlds,
            worldName,
            bases,
            selectedBase,
            selectBase,
            withBases,
        } = this.props;
        const { showWorld } = this.state;
        return (
            <>
                <Row>
                    {showWorld && (
                        <DropDownAnchor>
                            <DropDownArea>
                                {worlds.map(w => (
                                    <Button onClick={() => this.handleSelectWorld(w)}>
                                        {w.worldName}
                                    </Button>
                                ))}
                            </DropDownArea>
                        </DropDownAnchor>
                    )}
                    <Button onClick={this.toggleShowWorld} active>
                        {worldName}
                    </Button>
                    <Row>
                        {withBases &&
                        bases.map((base, i) => (
                            <Button
                                key={i}
                                onClick={() => selectBase(i)}
                                active={selectedBase === i}
                            >
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
    return {
        selectedBase: state.player.selectedBase,
        worlds: state.player.worlds,
        bases: state.player.bases,
        worldName: state.player.worldName,
        w: state.player.w,
    };
};

export default connect(
    mapStateToProps,
    { selectWorld: changeWorld, selectBase: changeBase }
)(WorldBaseMenu);
