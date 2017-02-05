import React from 'react'
import ProductionInfo from './ProductionInfo'
import UrlInfo from './UrlInfo'
import './../style/BaseHeader.css'


class BaseHeader extends React.Component
{
    render()
    {
    return (
        <div className="BaseHeader" >
            <UrlInfo />
            <ProductionInfo />
        </div>
    )
  }
}

export default BaseHeader