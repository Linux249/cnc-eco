/**
 * Created by Bombassd on 04.05.2017.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { changeBuilding  } from './../actions/buildings'
// import { changeFraction } from './../actions/menu'
// import { buildingKeys } from './../services/buildingKeys'
import './../style/Details.css'


class Details extends Component {

    render() {
       // const { changeBuild, changeFraction, fraction, from, lvl } = this.props

        return (

                <div className="Details">
                    Test
                </div>
            //
            // <div className="BuildingMenu" >
            //     <div className="fraction">
            //         <div className="fractionButton" onClick={() => changeFraction("nod")}>
            //             NOD
            //         </div>
            //         <div className="fractionButton" onClick={() => changeFraction("gdi")}>
            //             GDI
            //         </div>
            //     </div>
            //
            //     {buildingKeys.map((b) => {
            //         const img = require("./../img/buildings/"+ fraction + "/"+ b + ".png")
            //         return (
            //             <div
            //                 className="BuildingMenuItem"
            //                 key={b}
            //                 onClick={() => changeBuild(from, b, lvl)}
            //             >
            //                 <img src={img} alt={b} />
            //                 <div>{b}</div>
            //             </div>
            //         )
            //     })}
            // </div>
        )
    }


}
function mapStateToProps(state) {
    // return {
    //     lvl: state.buildings[state.menu.from].lvl || state.menu.lvl,
    //     from: state.menu.from,
    //     fraction: state.menu.fraction
    // }
}

const mapDispatchToProps = (dispatch) => {
    // return {
    //     changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
    //     changeFraction: fraction => dispatch(changeFraction(fraction))
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
