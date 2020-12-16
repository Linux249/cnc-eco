import { useRouter } from 'next/router';
import useAlliancess from '../hooks/worlds';
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

function AllianceMenu() {
    const router = useRouter();
    const [worlds, loadingAlliances, error] = useAlliancess();
    const [showAlliances, setShowAlliances] = useState(false);
    const [selectedAlliances, setSelectedAlliances] = useState();

    useEffect(() => {
        if (worlds.length) setSelectedAlliances(0);
    }, [worlds]);

    function selectAlliances(index) {
        setSelectedAlliances(index);
        router.push(`/alliance/${worlds[index].id}`);
    }

    const allianceName = worlds && worlds[selectedAlliances]?.name;

    return (
        <>
            <Row>
                <DropDownAnchor>
                    <ButtonHeader onClick={() => setShowAlliances(!showAlliances)} active={showAlliances}>
                        {loadingAlliances ? 'loading' : allianceName || 'nop alliance name'}
                    </ButtonHeader>
                    {showAlliances && (
                        <DropDownArea small>
                            {worlds.map((w, i) => (
                                <Button onClick={() => selectAlliances(i)} key={w.id}>
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

export default AllianceMenu;
