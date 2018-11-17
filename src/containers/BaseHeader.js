import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../style/BaseHeader';
import Title from '../style/Title';
import Button from '../style/Button';
import Row from '../style/Row';
import UrlInfo from './UrlInfo';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Link = Button.withComponent(
    styled(NavLink)`
        &.active {
            background-color: #46004d;
            color: white;
            border: none;
        }
    `
);

class BaseHeader extends Component {
    render() {
        const { isAuthenticated } = this.props;
        return (
            <Header>
                <Title>
                    <NavLink to="/">CNC-ECO</NavLink>
                </Title>
                <Row wrap>
                    {isAuthenticated && (
                        <>
                            <Link to="/bases" activeClassName="active">
                                Basen
                            </Link>
                            <Link to="/layouts" activeClassName="active">
                                Layouts
                            </Link>
                            <Link to="/alliance" activeClassName="active">
                                Alliance
                            </Link>
                        </>
                    )}
                    <Link to="/scripts" activeClassName="active">
                        Scripte
                    </Link>
                    {isAuthenticated ? (
                        <Link to="/user" activeClassName="active">
                            User
                        </Link>
                    ) : (
                        <Fragment>
                            <Link to="/login" activeClassName="active">
                                Login
                            </Link>
                            <Link to="/register" activeClassName="active">
                                Sign up
                            </Link>
                        </Fragment>
                    )}
                </Row>
            </Header>
        );
    }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(BaseHeader);
