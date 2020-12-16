import AllianceMenu from '@/components/AllianceMenu';
import React, { Fragment } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Header from '@/style/BaseHeader';
import Title from '@/style/AppName';
import Button from '@/style/Button';
import Row from '@/style/Row';
import { baseColor } from '@/style/constants';
import WorldsMenu from './WorldsMenu';
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

function PageHeader() {
    const [session, loading] = useSession();
    // todo add loading
    const isAuthenticated = !!session;
    const name = session?.user.name;
    return (
        <Header>
            <Title>
                <Link href="/">
                    <a>CNC-ECO</a>
                </Link>
            </Title>
            <Row wrap="true">
                {isAuthenticated && name && (
                    <>
                        <WorldsMenu />
                        <Link href={'/layouts'}>
                            <A>Layouts</A>
                        </Link>
                        <AllianceMenu />
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
