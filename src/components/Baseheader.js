import React from 'react'
import ProductionInfo from './ProductionInfo'


class BaseHeader extends React.Component
{
  render()
  {
    return (
      <div className="BaseHeader" >
          <ProductionInfo />
      </div>
    )
  }
}

export default BaseHeader