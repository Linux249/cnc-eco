import useWorlds from '../hooks/worlds';
import Row from '../style/Row';
import Button from '../style/Button';
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeBase, changeWorld } from '../store/actions/player';
import Area from '../style/Area';
import { baseColor } from '@/style/constants';

const ButtonHeader = styled(Button)`
    background-color: ${({ active }) => (active ? baseColor : 'inherit')};
    color: white;

    &:hover {
        background-color: ${baseColor};
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
    z-index: 20;
    //background-color: red;
    transition: height 0.25s linear 0.1s;
`;

function WorldsMenu() {
    const [worlds, loadingWorlds, error] = useWorlds();
    const [showWorld, setShowWorld] = useState(false);
    const [selectedWorld, setSelectedWorld] = useState();

    useEffect(() => {
        if (worlds.length) setSelectedWorld(0);
    }, [worlds]);

    function selectWorld(world) {
        setSelectedWorld(world);
    }

    const worldName = worlds && worlds[selectedWorld]?.name;

    return (
        <>
            <Row>
                <DropDownAnchor>
                    <ButtonHeader onClick={() => setShowWorld(!showWorld)} active={showWorld}>
                        {loadingWorlds ? 'loading' : worldName || 'nop world name'}
                    </ButtonHeader>
                    {showWorld && (
                        <DropDownArea small>
                            {worlds.map((w, i) => (
                                <Button onClick={() => selectWorld(i)} key={w.id}>
                                    {w.name}
                                </Button>
                            ))}
                        </DropDownArea>
                    )}
                </DropDownAnchor>
            </Row>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        worlds: state.player.worlds,
        worldName: state.player.worldName,
        w: state.player.w,
    };
};

export default connect(mapStateToProps, { selectWorld: changeWorld, selectBase: changeBase })(
    WorldsMenu
);
