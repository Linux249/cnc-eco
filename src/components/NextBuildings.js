/**
 * Created by Bombassd on 08.06.2017.
 */



import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shortenNumber } from './../services/menu'
import icon_tib from './../img/icon/icon_tiberium.png'
import icon_cris from './../img/icon/icon_crystal.png'
import icon_power from './../img/icon/icon_power.png'
import icon_credits from './../img/icon/icon_credits.png'
// import { changeBuilding  } from './../actions/buildings'
// import { changeFraction } from './../actions/menu'
import { calcTimeForAllBuildings } from './../util/production'
import { findBestToLvlUpNext } from './../util/performance'
import './../style/Details.css'


class NextBuildings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 1, // 0 = building, 1 = baseProd, 2 = random
            loading: true,
            buildings: []
        }
    }


    getNextBuildings = (buildings) => {
        // this.toggleDetails(2)
        fetch("http://localhost:8000/optimize", {
            method: "POST",
            body: JSON.stringify(buildings)
        }).then(res => res.json())
            .then(data => {
                this.setState({loading: false})
                this.setState({buildings: data})
                console.log(data)
            })
        // findBestToLvlUpNext(buildings).then(data => console.log({data}))
        // console.log(await best )

    }
    componentDidMount(){

        this.getNextBuildings(this.props.buildings)
    }

    render() {
        const { buildings } = this.props


        return (
            <div className="NextBuildings">
                {this.state.loading && "loading"}
                {this.state.buildings.map((building, i) =>
                    <div className="ListItem"
                        key={i}
                    >
                        {buildings[building].type}
                        {buildings[building].lvl}
                        Slot: {building}

                    </div>
                )}

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
    return {
        // days30: state.production.data[29],
        // days90: state.production.data[89],
        // days120: state.production.data[119],
        // building: state.buildings[state.menu.from]|| false,
        buildings: state.buildings,
    }
}

const mapDispatchToProps = (dispatch) => { return {}
    // return {
    //     changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
    //     changeFraction: fraction => dispatch(changeFraction(fraction))
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextBuildings)
