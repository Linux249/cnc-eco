import React, { Component } from 'react'
import ProductionInfo from './ProductionInfo'
import LineChart from './LineChart'
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
            </Area>
        )
    }
}

export default Menu