import React from 'react'
import Base from '../components/Base.js'
import BuildingMenu from '../containers/Buildings'
import WorldBaseMenu from '../containers/WorldBaseMenu'
import Menu from '../components/Menu'
import Body from '../style/Body'


function Bases() {
    return (
        <div>
            <WorldBaseMenu/>
            <Body>
                <BuildingMenu/>
                <Base/>
                <Menu/>
            </Body>
        </div>
    );
}

export default Bases