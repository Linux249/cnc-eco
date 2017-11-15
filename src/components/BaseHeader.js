import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../style/BaseHeader'
import Title from '../style/Title'
import Button from '../style/Button'
import Row from '../style/Row'
import UrlInfo from './UrlInfo'
import Login from './Login'
import s from 'styled-components'

const Link = s(NavLink)`
    height: 50px;
    
    &.active {
        back-ground-color: black;
        color: black;
    }
`
// https://github.com/styled-components/styled-components/issues/184

class BaseHeader extends Component
{
    render()
    {
        return (
            <Header>
                <Title>CNC-ECO</Title>
                <UrlInfo />
                <Row>
                    <Button>
                        <Link  to="/bases" activeClassName="active">Basen</Link>
                    </Button>
                    <Button>
                        <Link  to="/scripts" activeClassName="active">Scripte</Link>
                    </Button>
                    <Button>
                        <Link  to="/layouts" activeClassName="active">Layouts</Link>
                    </Button>
                    <Login />
                </Row>
            </Header>
        )
  }
}


export default BaseHeader
