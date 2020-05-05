import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Header from '../style/BaseHeader';
import Title from '../style/AppName';
import Button from '../style/Button';
import Row from '../style/Row';
import styled from 'styled-components';
import { connect } from 'react-redux';
import WorldsMenu from './WorldsMenu';
import { baseColor } from '../style/constants';

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

class BaseHeader extends Component {
    render() {
        const { isAuthenticated, name } = this.props;
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
                            <Link href="/bases">
                                <A>Basen</A>
                            </Link>
                            <Link href={'/layouts'}>
                                <A>Layouts</A>
                            </Link>
                            <Link href="/alliance">
                                <A>Alliance</A>
                            </Link>
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
                            <Link href="/feedback">Feedback</Link>
                            <Link href="/user">{name || 'Add a player name first'}</Link>
                        </>
                    ) : (
                        <Fragment>
                            <Link href="/login">
                                <A>Login</A>
                            </Link>
                            <Link href="/register">
                                <A>Sign up</A>
                            </Link>
                        </Fragment>
                    )}
                </Row>
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated && state.auth.isVerified,
    name: state.player.name,
});

export default connect(mapStateToProps)(BaseHeader);
