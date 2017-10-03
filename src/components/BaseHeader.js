import React, { Component } from 'react'
import Header from '../style/BaseHeader'
import UrlInfo from './UrlInfo'
import Login from './Login'

class BaseHeader extends Component
{
    render()
    {
        return (
            <Header>

                <UrlInfo />
                <Login />

            </Header>
        )
  }
}


export default BaseHeader
