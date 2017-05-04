/**
 * Created by Bombassd on 04.05.2017.
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
// import { buildingKeys } from './../services/buildingKeys'
import './../style/Details.css'


class Details extends Component {

    render() {
       const { days30, days90, days120 } = this.props

        return (



                <div className="Details">

                    <div className="buttons">
                        <div>Building</div>
                        <div>Base Prod.</div>
                    </div>
                    {/*die genau produktion in X Zeit könen wir nicht ausrechnen. Ein Gebäude ist in eher +0.03 Tagen erst fertig. Deshalb miteln wir den WErt durch die benötigte zeitvon */}
                    <div className="futureProd">
                        <div className="text">Produktion in X Tagen</div>
                        <div className="table">
                            <div className="column">
                               <br/>
                                <img src={icon_tib} alt={icon_tib} />
                                <img src={icon_cris} alt={icon_tib} />
                                <img src={icon_power} alt={icon_tib} />
                                <img src={icon_credits} alt={icon_tib} />
                            </div>
                            <div className="column">
                                <div>30</div>
                                <div>{shortenNumber(days30.prod.tib)}</div>
                                <div>{shortenNumber(days30.prod.cris)}</div>
                                <div>{shortenNumber(days30.prod.power)}</div>
                                <div>{shortenNumber(days30.prod.credits)}</div>
                            </div>
                            <div className="column">
                                <div>90</div>
                                <div>{shortenNumber(days90.prod.tib)}</div>
                                <div>{shortenNumber(days90.prod.cris)}</div>
                                <div>{shortenNumber(days90.prod.power)}</div>
                                <div>{shortenNumber(days90.prod.credits)}</div>
                            </div>
                            <div className="column">
                                <div>120</div>
                                <div>{shortenNumber(days120.prod.tib)}</div>
                                <div>{shortenNumber(days120.prod.cris)}</div>
                                <div>{shortenNumber(days120.prod.power)}</div>
                                <div>{shortenNumber(days120.prod.credits)}</div>
                            </div>
                        </div>
                    </div>
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
        days30: state.production.data[29],
        days90: state.production.data[89],
        days120: state.production.data[119],
    }
}

const mapDispatchToProps = (dispatch) => { return {}
    // return {
    //     changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
    //     changeFraction: fraction => dispatch(changeFraction(fraction))
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
