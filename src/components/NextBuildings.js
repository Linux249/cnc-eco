/**
 * Created by Bombassd on 08.06.2017.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
// import './../style/Details.css'
const ListItem = styled.div`
  display: flex;
  flex-flow: column;
  width: 50%
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`

const Row = styled.div`
    display: flex;
`

class NextBuildings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 1, // 0 = building, 1 = baseProd, 2 = random
            loading: true,
            buildings: [21, 23, 24]
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
    // componentDidMount(){
    //
    //     this.getNextBuildings(this.props.buildings)
    // }

    render() {
        const { buildings } = this.props


        return (
            <div className="NextBuildings">
                {this.state.loading && "loading"}
                {this.state.buildings.map((building, i) =>
                    <ListItem className="ListItem"
                        key={i}
                    >
                        <Row >Type: {buildings[building].type}</Row>
                        <Row >Level: {buildings[building].lvl}</Row>
                        <Row >Slot: {building} </Row>

                    </ListItem>
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
