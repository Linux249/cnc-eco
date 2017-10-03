import React, { Component } from 'react'
import Header from '../style/BaseHeader'
import UrlInfo from './UrlInfo'

class BaseHeader extends Component
{
    render()
    {
        return (
            <Header>
                <UrlInfo />

            </Header>
        )
  }
}


export default BaseHeader
