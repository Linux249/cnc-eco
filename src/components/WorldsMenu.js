import { useRouter } from 'next/router';
import useWorlds from '../hooks/worlds';
import Row from '@/style/Row';
import Button from '@/style/Button';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Area from '@/style/Area';
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
    background-color: white;
    transition: height 0.25s linear 0.1s;
`;

function WorldsMenu() {
    const router = useRouter();
    const [worlds, loadingWorlds, error] = useWorlds();
    const [showWorld, setShowWorld] = useState(false);
    const [selectedWorld, setSelectedWorld] = useState();

    useEffect(() => {
        if (worlds.length) setSelectedWorld(0);
    }, [worlds]);

    function selectWorld(index) {
        setSelectedWorld(index);
        router.push(`/world/${worlds[index].id}`);
    }

    return (
        <>
            <Row>
                <DropDownAnchor>
                    <ButtonHeader onClick={() => setShowWorld(!showWorld)} active={showWorld}>
                        {loadingWorlds ? 'loading' : 'Bases'}
                    </ButtonHeader>
                    {showWorld && (
                        <DropDownArea small>
                            {worlds.map((w, i) => (
                                <Button
                                    active={i === selectedWorld}
                                    onClick={() => selectWorld(i)}
                                    key={w.id}
                                >
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

export default WorldsMenu;
