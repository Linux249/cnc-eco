import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replaceBuilding  } from './../actions/base'
import { changeFraction } from './../actions/menu'
import { buildingKeys } from './../util/buildings'
import Menu from './../style/BuildingMenu'
import Button from './../style/Button'
import BuildingMenuItem from './BuildingMenuItem'
import Row from './../style/Row'


class BuildingMenu extends Component {

    render() {
        const { changeFraction, faction, lvl } = this.props
        const items = buildingKeys.map((type) => {
            const img = require("./../img/buildings/"+ faction + "/"+ type + ".png")
            const building = {
                type,
                lvl: (type !== "t" && type!=="c" ) ? lvl : undefined
            }
            return <BuildingMenuItem img={img} type={type} building={building} key={type}/>

        })
        return (
            <Menu>
                <Row className="fraction">
                    <Button className="fractionButton" onClick={() => changeFraction("nod")}>
                        NOD
                    </Button>
                    <Button className="fractionButton" onClick={() => changeFraction("gdi")}>
                        GDI
                    </Button>
                </Row>

                { items }
            </Menu>
        )
    }


}
function mapStateToProps(state) {
    return {
        faction: state.base.faction,
        lvl: state.menu.lvl
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        replaceBuilding: (building) => dispatch(replaceBuilding(building)),
        changeFraction: fraction => dispatch(changeFraction(fraction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMenu)
