import React, { Component } from 'react'
import { connect } from 'react-redux';

import BuildingSlot from './BuildingSlot.js'
import BuildingMenu from './BuildingMenu.js';
//import Details from './Details.js'
import '../style/Base'
import Area from '../style/Area'
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

                <Area>
                    <BaseStyle>
                        {slots}
                    </BaseStyle>
                </Area>

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

export default connect(mapStateToProps, mapDispatchToProps)(Base);