/**
 * Created by Bombassd on 03.01.2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import './../style/ProductionInfo.css'
import { shortenNumber } from './../services/menu'

class ProductionInfo extends React.Component
{

    render()
    {

        return (
            <div className="ProductionInfo">
                <div className="Production" >{shortenNumber(this.props.production.tib,2)}</div>
                <div >{shortenNumber(this.props.production.kris, 2)}</div>
                <div >{shortenNumber(this.props.production.power, 2)}</div>
                <div >{shortenNumber(this.props.production.credits, 2)}</div>
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


