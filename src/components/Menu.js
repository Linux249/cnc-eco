import React, { Component } from 'react'
import ProductionInfo from '../containers/ProductionInfo'
import LineChart from '../containers/LineChart'
import UpgradeBase from '../containers/UpgradeBase'
import Area from '../style/Area'

class Menu extends Component {

    constructor() {
        super()
        // this.state = {
        //
        // }
    }

    render () {

        return (
            <Area>
                <ProductionInfo />
                <LineChart />
                <UpgradeBase />
            </Area>
        )
    }
}

export default Menu