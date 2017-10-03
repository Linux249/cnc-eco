import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BuildingSlot from './BuildingSlot.js'
import BuildingMenu from './BuildingMenu.js';
//import Details from './Details.js'
import '../style/Base'
import { showBuildingMenu } from './../actions/menu'
import Row from '../style/Row'
import BaseStyle from '../style/Base'

class Base extends Component
{


render()
{
    const { show } = this.props
    const slots = [...Array(8).keys()].map(function(y) {
        return (
            <div key={"rowB " + y} className={"rowB " + y}>
                {[...Array(9).keys()].map(function(x) {
                  const slot = x+y*9
                  return <BuildingSlot key={slot} slot={slot} />
                })
              }
            </div>
        )
      })

    return (
        <Row>
               <BuildingMenu />
            <div className="BaseMiddle">
                <BaseStyle className="Base" >
                    {slots}
                </BaseStyle>
            </div>
            <div className="BaseSideRight" >
                {/*<Details />*/}
            </div>
        </Row>
    );
  }
}

function mapStateToProps(state) {
    return ({
        show: state.menu.from,
       // buildings: state.buildings
    });
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

Base = DragDropContext(HTML5Backend)(Base)
export default connect(mapStateToProps, mapDispatchToProps)(Base);