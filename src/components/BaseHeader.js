import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../style/BaseHeader'
import Title from '../style/Title'
import Button from '../style/Button'
import Row from '../style/Row'
import UrlInfo from './UrlInfo'
import Login from './Login'

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
                        <Link to="/bases">Basen</Link>
                    </Button>
                    <Button>
                        <Link to="/scripts">Scripte</Link>
                    </Button>
                    <Button>
                        <Link to="/layouts">Layouts</Link>
                    </Button>
                    <Login />
                </Row>
            </Header>
        )
  }
}


export default BaseHeader
