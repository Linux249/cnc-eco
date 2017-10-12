import React, { Component } from 'react'
import ProductionInfo from './ProductionInfo'
import LineChart from './LineChart'
import UpgradeBase from './UpgradeBase'
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