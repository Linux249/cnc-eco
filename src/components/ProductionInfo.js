/**
 * Created by Bombassd on 03.01.2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup  } from 'react-bootstrap'

class ProductionInfo extends React.Component
{
    render()
    {
        return (
            <div className="ProductionInfo">
                <div >
                    <ButtonGroup>

                        <Button >{this.props.production.tib}</Button>
                        <Button >{this.props.production.kris}</Button>
                        <Button >{this.props.production.power}</Button>
                        <Button >{this.props.production.credits}</Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return ({

        production: state.production
    });
}

export default connect(mapStateToProps)(ProductionInfo)


