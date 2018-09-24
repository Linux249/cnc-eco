import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../style/BaseHeader'
import Title from '../style/Title'
import Button from '../style/Button'
import Row from '../style/Row'
import UrlInfo from './UrlInfo'
import styled from 'styled-components'

const Link = Button.withComponent(
    styled(NavLink)`
        &.active {
            background-color: #46004d;
            color: white;
            border: none;
        }
    `
)

class BaseHeader extends Component
{
    render()
    {
        return (
            <Header>
                <Title><NavLink to="/">CNC-ECO</NavLink></Title>
                <UrlInfo />
                <Row>
                    <Link  to="/bases" activeClassName="active">Basen</Link>
                    <Link  to="/scripts" activeClassName="active">Scripte</Link>
                    <Link  to="/layouts" activeClassName="active">Layouts</Link>
                    <Link  to="/login" activeClassName="active">Login</Link>
                    <Link  to="/register" activeClassName="active">Sign up</Link>
                </Row>
            </Header>
        )
    }
}


export default BaseHeader
