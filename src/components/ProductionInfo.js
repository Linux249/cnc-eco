/**
 * Created by Bombassd on 03.01.2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import './../style/ProductionInfo.css'

class ProductionInfo extends React.Component
{

    render()
    {

        return (
            <div className="ProductionInfo">
                <div className="Production" >{this.props.production.tib}</div>
                <div >{this.props.production.kris}</div>
                <div >{this.props.production.power}</div>
                <div >{this.props.production.credits}</div>
            </div>
        )
    }
}
function mapStateToProps(state) {

    return ({
        production: state.production
    });
}

export default connect(mapStateToProps)(ProductionInfo)


