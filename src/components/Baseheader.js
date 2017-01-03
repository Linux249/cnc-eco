import React from 'react'
import ProductionInfo from './ProductionInfo'


//import App from './Test.js';





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