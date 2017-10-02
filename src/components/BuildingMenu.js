import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux'
import { replaceBuilding  } from './../actions/base'
import { changeFraction } from './../actions/menu'
import { buildingKeys } from './../util/buildings'
import './../style/BuildingMenu.css'
import BuildingMenuItem from './BuildingMenuItem'

import { DropTarget, DragSource } from 'react-dnd'



class BuildingMenu extends Component {

    render() {
        const { changeFraction, faction, lvl } = this.props
        const items = buildingKeys.map((type) => {
            const img = require("./../img/buildings/"+ faction + "/"+ type + ".png")
            return <BuildingMenuItem img={img} type={type} building={{type, lvl}} key={type}/>

        })
        return (
            <div className="BuildingMenu" >
                <div className="fraction">
                    <div className="fractionButton" onClick={() => changeFraction("nod")}>
                        NOD
                    </div>
                    <div className="fractionButton" onClick={() => changeFraction("gdi")}>
                        GDI
                    </div>
                </div>

                { items }
            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
        faction: state.base.faction,
        lvl: state.base.defaultBuildingLvl
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        replaceBuilding: (building) => dispatch(replaceBuilding(building)),
        changeFraction: fraction => dispatch(changeFraction(fraction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMenu)
