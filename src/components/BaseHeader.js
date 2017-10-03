import React, { Component } from 'react'
import ProductionInfo from './ProductionInfo'
import UrlInfo from './UrlInfo'
import Header from '../style/BaseHeader'

class BaseHeader extends Component
{
    render()
    {
        return (
            <Header>
                <UrlInfo />
                <ProductionInfo />
            </Header>
        )
  }
}


export default BaseHeader
