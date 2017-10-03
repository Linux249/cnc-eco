import React, { Component } from 'react'
import Header from '../style/BaseHeader'
import Title from '../style/Title'
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
                <Login />

            </Header>
        )
  }
}


export default BaseHeader
