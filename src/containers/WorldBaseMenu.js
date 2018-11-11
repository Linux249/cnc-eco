import Row from '../style/Row'
import Button from '../style/Button'
import React from 'react'
import {connect} from 'react-redux'


export const WorldBaseMenu = (props) => {
    const { worlds, bases } = props
    return (
        <>
            <Row>
                worlds
                {worlds.map((world, i) => (
                    <Button key={i} onClick={() => {}}>
                        {world.name}
                    </Button>
                ))}
            </Row>
            bases
            <Row>
                {bases.map((base, i) => (
                    <Button key={i} onClick={() => {}}>
                        {base.name}
                    </Button>
                ))}
            </Row>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        worlds: [],
        bases: []
    }
}

export default connect(mapStateToProps)(WorldBaseMenu);