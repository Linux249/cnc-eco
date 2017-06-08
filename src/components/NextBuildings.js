/**
 * Created by Bombassd on 08.06.2017.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { changeBuilding  } from './../actions/buildings'

// import './../style/Details.css'
const ListItem = styled.div`
  display: flex;
  flex-flow: column;
 
  
  margin: 2px 0;

  background: white;
  
`

const Row = styled.div`
    display: flex;
    
`
const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 33%;
    height: 30px;

    background-color: #EEE;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid #CCC;
    border-radius: 3px;
    margin: 2px;
    ${props => props.loading && `
		background: grey;
		color: white;
	`}
`

class NextBuildings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 1, // 0 = building, 1 = baseProd, 2 = random
            loading: false,
            buildings: [33],
            error: false
        }
    }

    removeFromList(index) {
        console.log(index)
        this.setState(prevState => ({
                buildings: prevState.buildings.filter((_, i) => i !== index)
        }))

    }


    getNextBuildings = (buildings) => {
        if(!this.state.loading)     //prevent for too many clicks/loads
        {
            this.setState({loading: true})
            // this.toggleDetails(2)
            fetch("http://localhost:8000/optimize", {
                method: "POST",
                body: JSON.stringify(buildings)
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({loading: false})
                    this.setState({buildings: data})
                    console.log(data)
                })
                .catch(e => this.setState({error: true, loading: false}))
        }
    }
    componentDidMount(){
        this.getNextBuildings(this.props.buildings)
    }

    render() {
        const { buildings, changeBuild} = this.props
        const { loading } = this.state

        return (
            <div className="NextBuildings">
                <Button
                    loading={loading}
                    onClick={() => this.getNextBuildings(buildings)}
                >
                    {loading ? "loading": "Schuffle"}
                </Button>

                {this.state.buildings.map((building, i) =>
                    <ListItem
                        key={i}
                        onClick={() => {
                            this.removeFromList(i)
                            changeBuild(building, buildings[building].type , buildings[building].lvl + 1 )
                        }}
                    >
                        <Row >Type: {buildings[building].type}</Row>
                        <Row >Level: {buildings[building].lvl}</Row>
                        <Row >Slot: {building} </Row>

                    </ListItem>
                )}
                {this.state.error && "FEHLER"}

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

const mapDispatchToProps = (dispatch) => { return {
        changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
    }
    // return {
    //     changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
    //     changeFraction: fraction => dispatch(changeFraction(fraction))
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextBuildings)
