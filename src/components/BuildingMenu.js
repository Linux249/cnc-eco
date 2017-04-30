import React, { Component } from 'react'
import { connect } from 'react-redux'
import buildings_pngs from '../util/buildings_img_nod.json'
import { changeBuilding  } from './../actions/buildings'
import { changeFraction } from './../actions/menu'
import './../style/BuildingMenu.css'

class BuildingMenu extends Component {

    render() {
        const { changeBuild, changeFraction, from, lvl } = this.props

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

                {Object.keys(buildings_pngs).map((buildingName) => {
                    const img =  require('./../img/buildings/NOD/' + buildingName + '.png')
                    return (
                        <div
                            className="BuildingMenuItem"
                            key={buildingName}
                            onClick={() => changeBuild(from, buildings_pngs[buildingName], lvl)}
                        >
                            <img
                 //  onClick={changeBuild(buildings_pngs[buildingName])}
                               // onClick={this.buildingSelect}
                                src={img} //NOD GDI variable
                                alt={buildingName}
                                data-name={buildingName}
                                data-id={buildings_pngs[buildingName]}
                            />
                            <p>{buildings_pngs[buildingName]}</p>
                        </div>
                  )
                })}
            </div>
        )
    }


}
function mapStateToProps(state) {
    return {
        lvl: state.buildings[state.menu.from].lvl || state.menu.lvl,
        from: state.menu.from
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
        changeFraction: fraction => dispatch(changeFraction(fraction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMenu)
