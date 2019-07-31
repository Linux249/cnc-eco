/**
 * Created by Bombassd on 04.05.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NextBuildings from './NextBuildings';
import styled from 'styled-components';

import { shortenNumber } from '../util/service';
import { calcBuildingCost } from '../util/production';
import { keys as buildingNames } from '../util/keys';

import icon_tib from '../img/icon/icon_tiberium.png';
import icon_cris from '../img/icon/icon_crystal.png';
import icon_power from '../img/icon/icon_power.png';
import icon_credits from '../img/icon/icon_credits.png';
// import { changeBuilding  } from './../actions/buildings'
// import { changeFraction } from './../actions/menu'
//  import { calcTimeForAllBuildings } from './../util/production'
// import { findBestToLvlUpNext } from './../util/performance'
import '../style/Details.css';
const Row = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
`;

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 0, // 0 = building, 1 = baseProd, 2 = random
        };
    }

    toggleDetails(show) {
        this.setState({
            show,
        });
    }

    // fetch data from server
    // rand = (buildings) => {
    //     this.toggleDetails(2)
    //     fetch("http://localhost:8000/optimize", {
    //         method: "POST",
    //         body: JSON.stringify(buildings)
    //     }).then(res => res.json())
    //         .then(data => console.log(data))
    //
    // }

    render() {
        const { days30, days90, days120, building } = this.props;
        const buildingProd = calcBuildingCost(building);

        const showNextBuildings = this.state.show === 2;
        // const time = calcTimeForAllBuildings(buildings)
        return (
            <div className="Details">
                <div className="buttons">
                    <div onClick={() => this.toggleDetails(0)}>Building</div>
                    <div onClick={() => this.toggleDetails(1)}>Production</div>
                    <div onClick={() => this.toggleDetails(2)}>Random</div>
                </div>

                {/*die genau produktion in X Zeit könen wir nicht ausrechnen. Ein Gebäude ist in eher +0.03 Tagen erst fertig. Deshalb miteln wir den WErt durch die benötigte zeitvon */}
                {this.state.show === 0 && building && (
                    <div className="buildings">
                        <Row>Name: {buildingNames[building.type]}</Row>
                        <Row>Production: (arrowUp) </Row>
                        <Row>Upgrade costs: </Row>
                        <Row>
                            {shortenNumber(buildingProd.tib, 2)}
                            <img src={icon_tib} alt={icon_tib} />
                        </Row>
                        <Row>
                            {shortenNumber(buildingProd.power, 2)}
                            <img src={icon_power} alt={icon_tib} />
                        </Row>
                        {/*<div>+production: </div>*/}
                        {/*<div>kosten/+prod: </div>*/}
                    </div>
                )}
                {this.state.show === 0 && !building && <div>Kein Gebude ausgewählt</div>}

                {this.state.show === 1 && (
                    <div className="futureProd">
                        <div className="text">Produktion in X Tagen</div>
                        <div className="table">
                            <div className="column">
                                <br />
                                <br />
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
                )}
                {showNextBuildings && <NextBuildings />}
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
        );
    }
}
function mapStateToProps(state) {
    return {
        days30: state.production.data[29],
        days90: state.production.data[89],
        days120: state.production.data[119],
        building: state.buildings[state.menu.from] || false,
    };
}

// const mapDispatchToProps = (dispatch) => { return {}
//     // return {
//     //     changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
//     //     changeFraction: fraction => dispatch(changeFraction(fraction))
//     // }
// }

export default connect(mapStateToProps)(Details);
