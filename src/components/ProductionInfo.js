/**
 * Created by Bombassd on 03.01.2017.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import './../style/ProductionInfo.css'
import icon_tib from './../img/icon/icon_tiberium.png'
import { shortenNumber } from './../services/menu'
import icon_cris from './../img/icon/icon_crystal.png'
import icon_power from './../img/icon/icon_power.png'
import icon_credits from './../img/icon/icon_credits.png'


class ProductionInfo extends Component
{
    render()
    {
        const {tib, cris, power, credits } = this.props.production
        return (
            <div className="ProductionInfo">

                <div>

                    {shortenNumber(tib, 2)}
                    <img src={icon_tib} alt={icon_tib} />
                </div>
                <div>

                    {shortenNumber(cris, 2)}
                    <img src={icon_cris} alt={icon_tib} />
                </div>
                <div>

                    {shortenNumber(power, 2)}
                    <img src={icon_power} alt={icon_tib} />
                </div>
                <div>

                    {shortenNumber(credits, 2)}
                    <img src={icon_credits} alt={icon_tib} />
                </div>
            </div>
        )

    }
}
function mapStateToProps(state) {

    return ({
        production: state.production.normal
    });
}

export default connect(mapStateToProps)(ProductionInfo)


