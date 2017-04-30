import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductionInfo from './ProductionInfo'
import UrlInfo from './UrlInfo'
import './../style/BaseHeader.css'
import { showBuildingMenu } from './../actions/menu'

class BaseHeader extends Component
{
    render()
    {
        const { showBuildingMenu } = this.props
        return (
            <div className="BaseHeader" onClick={() => showBuildingMenu(-1)} >
                <UrlInfo />
                <ProductionInfo />
            </div>
        )
  }
}

function mapStateToProps() {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showBuildingMenu: (from) => dispatch(showBuildingMenu(from)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseHeader)
