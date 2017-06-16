/**
 * Created by Bombassd on 08.06.2017.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import FlipMove from 'react-flip-move'

import { changeBuilding  } from './../actions/buildings'
import { showBuildingMenu  } from './../actions/menu'
import { buildings as buildingNames } from '../util/buildings'
import  io from 'socket.io-client'
const socketURL = `http://cnc-eco.herokuapp.com`
const socket = io(socketURL)




// import './../style/Details.css'
const ListItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2px 0;
  background: white;
  height: 80px;
`

const Column = styled.div`
    display: flex;
    flex-flow: column;
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
            buildings: [24, 10],
            error: false
        }
    }

    removeFromList(index) {
        console.log(index)
        this.setState(prevState => ({
                buildings: prevState.buildings.filter((_, i) => i !== index)
        }))

    }

    toogleLoading(buildings = []) {
        if(!this.state.loading) {
            socket.connect()
            socket.emit("buildings", buildings);

        } else {
            socket.close()
        }
        this.setState(prevState => {
            return {loading: !prevState.loading}
        })

    }


    getNextBuildings = (buildings) => {
        if(!this.state.loading) this.toogleLoading(buildings)
        console.log("button clicked")
        // socket.close();
        // socket.connect();





        /*if(!this.state.loading)     //prevent for too many clicks/loads
        {
            this.setState({loading: true})  //start loading
            this.setState({error: false})  // reset error
            this.setState({buildings: []})  // delete old items
            // call new items/buildings from server
            fetch("https://cnc-eco.herokuapp.com/optimize", {
                method: "POST",
                body: JSON.stringify(buildings)
            }).then(response => {
                // response.body is a readable stream.
                // Calling getReader() gives us exclusive access to
                // the stream's content
                var reader = response.body.getReader();
                var bytesReceived = 0;

                // read() returns a promise that resolves
                // when a value has been received
                reader.read().then(function processResult(result) {
                    // Result objects contain two properties:
                    // done  - true if the stream has already given
                    //         you all its data.
                    // value - some data. Always undefined when
                    //         done is true.
                    if (result.done) {
                        console.log("Fetch complete");
                        return;
                    }

                    // result.value for fetch streams is a Uint8Array
                    bytesReceived += result.value.length;
                    console.log('Received', bytesReceived, 'bytes of data so far');

                    // Read some more, and call this function again
                    return reader.read().then(processResult);
                });
            });

           /!* fetch("https://cnc-eco.herokuapp.com/optimize", {
                method: "POST",
                body: JSON.stringify(buildings)
            })
                .then(res => res.arrayBuffer()/!*{
                    console.log("RESP")
                    const buffer = res.body
                    buffer.read().then(function(result) {
                        // array of cell values for the first row
                        console.log(result.value);
                    });
                    // console.log(buffer.json())
                    // return res.json()
                }*!/)
                .then(blob => {
                    console.log(blob.read())
                    const out = blob.slice()
                    console.log(out)
                })
                // .then(data => {
                //     this.setState({loading: false})     //finish loading
                //     this.setState({buildings: data})    // update List
                //     console.log(data)
                // })
                .catch(e => this.setState({error: true, loading: false}))*!/
        }*/
    }
    componentDidMount(){
        socket.on("buildings", data => {
            console.log(data)
            if(data) this.setState({buildings: data})
            else this.toogleLoading()
        })

        // socket.emit("connect", function(data){
        //     console.log(data);
        // });
        // this.getNextBuildings(this.props.buildings)
    }

    render() {
        const { buildings, fraction, changeBuild, selectSlot} = this.props
        const { loading } = this.state

        return (
            <div className="NextBuildings">

                <Button
                    loading={true}
                >
                    Delete Buildings
                </Button>
                <Button>
                    Place Silos/raffs/akku
                </Button>
                <Button>
                    All lvl 30
                </Button>
                <Button
                    loading={loading}
                    onClick={() => this.getNextBuildings(buildings)}
                >
                    {loading ? "loading": "Schuffle"}
                </Button>

                <FlipMove duration={250} easing="ease-out"
                          staggerDurationBy="30"
                          // duration={500}
                          enterAnimation="accordianVertical"
                          leaveAnimation="accordianVertical"
                          // typeName=""
                >
                    {this.state.buildings.map((slot, i) =>{
                        const building = buildings[slot]
                        const img = require("./../img/buildings/"+fraction+  "/"+ building.type + ".png")

                        return (
                            <ListItem
                                onMouseEnter={() => selectSlot(slot)}
                                onMouseLeave={() => selectSlot(-1)}


                                key={i}
                                onClick={() => {
                                    this.removeFromList(i)
                                    changeBuild(slot, building.type , building.lvl + 1 )
                                }}
                            >

                                <img
                                    height="80%"
                                    src={img}
                                    alt={building.type}
                                />
                                <Column >
                                    {buildingNames[building.type]}<br/>
                                    Level: {building.lvl}<br/>
                                    Slot: {slot}
                                </Column>


                            </ListItem>)
                    }
                    )}
                </FlipMove>
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
        buildings: state.buildings,
        fraction: state.menu.fraction

    }
}

const mapDispatchToProps = (dispatch) => { return {
        changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
        selectSlot: (from) => dispatch(showBuildingMenu(from)),
    }
    // return {
    //     changeBuild: (from, t, lvl) => dispatch(changeBuilding(from, t, lvl)),
    //     changeFraction: fraction => dispatch(changeFraction(fraction))
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextBuildings)
