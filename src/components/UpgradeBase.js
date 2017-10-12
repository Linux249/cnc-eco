import React from 'react'
import { connect } from 'react-redux';
import { buildingsUp, buildingsDown } from '../actions/base'
import Row from '../style/Row'
import Button from '../style/Button'

const UpgradeBase = ({buildingsUp, buildingsDown}) => (
    <div>
        <Row>
            <Button>Silos</Button>
            <Button onClick={() => buildingsUp("s")}>+</Button>
            <Button onClick={() => buildingsDown("s")}>-</Button>
        </Row>
        <Row>
            <Button>Sammler</Button>
            <Button>Tib</Button>
            <Button onClick={() => buildingsUp("h")}>+</Button>
            <Button onClick={() => buildingsDown("h")}>-</Button>
            <Button>Kris</Button>
            <Button onClick={() => buildingsUp("n")}>+</Button>
            <Button onClick={() => buildingsDown("n")}>-</Button>
        </Row>
        <Row>
            <Button>Accu</Button>
            <Button onClick={() => buildingsUp("a")}>+</Button>
            <Button onClick={() => buildingsDown("a")}>-</Button>
        </Row>
        <Row>
            <Button>Raffs</Button>
            <Button onClick={() => buildingsUp("r")}>+</Button>
            <Button onClick={() => buildingsDown("r")}>-</Button>
        </Row>
    </div>
)
const mapDispatchToProps = (dispatch) => {
    return {
        buildingsUp: (type) => dispatch(buildingsUp(type)),
        buildingsDown: (type) => dispatch(buildingsDown(type))
    }
}

export default connect(null, mapDispatchToProps)(UpgradeBase);
