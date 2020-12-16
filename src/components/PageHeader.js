import Area from '@/style/Area';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Header from '@/style/BaseHeader';
import Title from '@/style/AppName';
import Button from '@/style/Button';
import Row from '@/style/Row';
import { baseColor } from '@/style/constants';
import useWorlds from '../hooks/worlds';
import { useSession } from 'next-auth/client';

const A = Button.withComponent(styled('a')`
    color: white !important;
    //background-color: inherit;
    border: none !important;

    &:hover {
        background: ${baseColor} !important;
        transition: background 0.1s linear;
    }

    &.active {
        background-color: ${baseColor} !important;
    }
`);

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

function PageHeader() {
    const [session, loading] = useSession();
    // todo add loading
    const isAuthenticated = !!session;
    const name = session?.user.name;

    const router = useRouter();

    const [worlds, loadingWorlds, error] = useWorlds();
    const [showWorld, setShowWorld] = useState(false);
    const [selectedWorld, setSelectedWorld] = useState();

    /**
     * init after worlds updated
     */
    useEffect(() => {
        if (worlds.length) setSelectedWorld(0);
    }, [worlds]);

    function selectWorld(index) {
        setSelectedWorld(index);
        setShowWorld(false);
        // todo redirect to other url
    }

    const worldName = worlds && worlds[selectedWorld]?.name;
    const worldId = worlds && worlds[selectedWorld]?.id;

    return (
        <Header>
            <Title>
                <Link href="/">
                    <a>CNC-ECO</a>
                </Link>
            </Title>
            <Row wrap>
                {isAuthenticated && name && (
                    <>
                        <Row>
                            <DropDownAnchor>
                                <ButtonHeader
                                    onClick={() => setShowWorld(!showWorld)}
                                    active={showWorld}
                                >
                                    {loadingWorlds ? 'loading' : worldName}
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
                        {worldId && (
                            <>
                                <Link href={'/world/' + worldId}>
                                    <A>Bases</A>
                                </Link>
                                <Link href={'/layouts/' + worldId}>
                                    <A>Layouts</A>
                                </Link>
                                <Link href={'/alliance/' + worldId}>
                                    <A>Alliance</A>
                                </Link>
                            </>
                        )}
                    </>
                )}
                <Link href="/scripts">
                    <A>Scripte</A>
                </Link>
                {/*<Link href="/demo">
                 Demo
                 </Link>*/}
                {isAuthenticated ? (
                    <>
                        <Link href="/feedback">
                            <A>Feedback</A>
                        </Link>
                        <Link href="/user">
                            <A>{name || 'Add Player first'}</A>
                        </Link>
                    </>
                ) : (
                    <Fragment>
                        <Link href="/login">
                            <A>Login</A>
                        </Link>
                    </Fragment>
                )}
            </Row>
        </Header>
    );
}

export default PageHeader;
