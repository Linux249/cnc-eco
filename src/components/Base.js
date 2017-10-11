import React, { Component } from 'react'
//import { connect } from 'react-redux';
import BuildingSlot from './BuildingSlot.js'
//import Details from './Details.js'
import Area from '../style/Area'
import BaseStyle from '../style/Base'

class Base extends Component
{

    render()
    {
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




export default Base;