import React from 'react'
import Base from './Base.js'
import BuildingMenu from './Buildings'
import Menu from './Menu'
import Body from '../style/Body'

export default () => (
    <Body>
        <BuildingMenu />
        <Base />
        <Menu/>
    </Body>
)