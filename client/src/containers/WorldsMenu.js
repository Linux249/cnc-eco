import Row from '../style/Row';
import Button from '../style/Button';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeBase, changeWorld } from '../store/actions/player';
import Area from '../style/Area';
import { backgroundColorButtonHeader } from '../style/constants';

const ButtonHeader = styled(Button)`
    background-color: ${({ active }) => (active ? backgroundColorButtonHeader : 'inherit')};
    color: white;
    &:hover {
        background-color: ${backgroundColorButtonHeader};
    }
`;

const DropDownAnchor = styled.div`
    position: relative;
    width: inherit;
`;

const DropDownArea = styled(Area)`
    position: absolute;
    top: 2rem;
    right: 0;
    z-index: 10;
    //background-color: red;
    transition: height 0.25s linear 0.1s;
`;

class WorldsMenu extends Component {
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
        const { worlds, worldName } = this.props;
        const { showWorld } = this.state;
        return (
            <>
                <Row>
                    <DropDownAnchor>
                        <ButtonHeader onClick={this.toggleShowWorld} active={showWorld}>
                            {worldName}
                        </ButtonHeader>
                        {showWorld && (
                            <DropDownArea small>
                                {worlds.map(w => (
                                    <Button
                                        onClick={() => this.handleSelectWorld(w)}
                                        key={w.worldId}
                                    >
                                        {w.worldName}
                                    </Button>
                                ))}
                            </DropDownArea>
                        )}
                    </DropDownAnchor>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        worlds: state.player.worlds,
        worldName: state.player.worldName,
        w: state.player.w,
    };
};

export default connect(
    mapStateToProps,
    { selectWorld: changeWorld, selectBase: changeBase }
)(WorldsMenu);
