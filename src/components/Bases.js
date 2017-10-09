import React from 'react'
import Base from './Base.js'
import BuildingMenu from './BuildingMenu'
import ProductionInfo from './ProductionInfo'
import LineChart from './LineChart.js'
import Area from '../style/Area'
import Body from '../style/Body'


export default () => <Body>
    <BuildingMenu />
    <Base />
    <Area>
        <ProductionInfo />
        <LineChart />
    </Area>
</Body>