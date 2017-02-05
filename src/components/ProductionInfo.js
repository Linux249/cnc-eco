/**
 * Created by Bombassd on 03.01.2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import './../style/ProductionInfo.css'
import icon_tib from './../img/icon/icon_tiberium.png'


import { shortenNumber } from './../services/menu'
import icon_cris from './../img/icon/icon_crystal.png'
import icon_power from './../img/icon/icon_power.png'
import icon_credits from './../img/icon/icon_credits.png'
class ProductionInfo extends React.Component
{
    render()
    {
        return (
            <div className="ProductionInfo">
                <div>

                    {shortenNumber(this.props.production.tib,2)}
                    <img src={icon_tib}/>
                </div>
                <div>

                    {shortenNumber(this.props.production.kris, 2)}
                    <img src={icon_cris}/>
                </div>
                <div>

                    {shortenNumber(this.props.production.power, 2)}
                    <img src={icon_power}/>
                </div>
                <div>

                    {shortenNumber(this.props.production.credits, 2)}
                    <img src={icon_credits} />
                </div>
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


