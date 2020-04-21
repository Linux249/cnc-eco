import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import Header from '../style/BaseHeader';
import Title from '../style/AppName';
import Button from '../style/Button';
import Row from '../style/Row';
import styled from 'styled-components';
import { connect } from 'react-redux';
import WorldsMenu from './WorldsMenu';
import { baseColor } from '../style/constants';

const NavLink = Button.withComponent(
    styled(Link)`
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
    `
);

class BaseHeader extends Component {
    render() {
        const { isAuthenticated, name } = this.props;
        return (
            <Header>
                <Title>
                    <NavLink href="/">CNC-ECO</NavLink>
                </Title>
                <Row wrap="true">
                    {isAuthenticated && name && (
                        <>
                            <WorldsMenu />
                            <NavLink href="/bases">
                                Basen
                            </NavLink>
                            <NavLink href={'/layouts'}>
                                Layouts
                            </NavLink>
                            <NavLink href="/alliance">
                                Alliance
                            </NavLink>
                        </>
                    )}
                    <NavLink href="/scripts">
                        Scripte
                    </NavLink>
                    {/*<NavLink href="/demo">
                        Demo
                    </NavLink>*/}
                    {isAuthenticated ? (
                        <>
                            <NavLink href="/feedback">
                                Feedback
                            </NavLink>
                            <NavLink href="/user">
                                {name || 'Add a player name first'}
                            </NavLink>
                        </>
                    ) : (
                        <Fragment>
                            <NavLink href="/login">
                                Login
                            </NavLink>
                            <NavLink href="/register">
                                Sign up
                            </NavLink>
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
