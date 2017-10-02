/**
 * Created by Bombassd on 03.01.2017.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import './../style/ProductionInfo.css'
import { shortenNumber } from './../services/menu'
import { calcProduction } from './../util/production'
import icon_tib from './../img/icon/icon_tiberium.png'
import icon_cris from './../img/icon/icon_crystal.png'
import icon_power from './../img/icon/icon_power.png'
import icon_credits from './../img/icon/icon_credits.png'


class ProductionInfo extends Component
{
    render()
    {
        const { buildings } = this.props
        const production = calcProduction(buildings)
        const {tib, kris, power, credits } = production
        console.log({production})
        return (
            <div className="ProductionInfo">

                <div>

                    {shortenNumber(tib, 2)}
                    <img src={icon_tib} alt={icon_tib} />
                </div>
                <div>

                    {shortenNumber(kris, 2)}
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
        buildings: state.base.buildings
    });
}

export default connect(mapStateToProps)(ProductionInfo)


