import React from 'react';
import { connect } from 'react-redux';
import { buildingsUp, buildingsDown } from '../store/actions/base';
import Row from '../style/Row';
import Button from '../style/Button';

const UpgradeBase = ({ buildingsUp, buildingsDown }) => (
    <div>
        <Row>
            <Button small>Silos</Button>
            <Button small onClick={() => buildingsUp('s')}>+</Button>
            <Button small onClick={() => buildingsDown('s')}>-</Button>
        </Row>
        <Row>
            <Button small>Sammler</Button>
            <Button small>Tib</Button>
            <Button small onClick={() => buildingsUp('h')}>+</Button>
            <Button small onClick={() => buildingsDown('h')}>-</Button>
            <Button small>Kris</Button>
            <Button small onClick={() => buildingsUp('n')}>+</Button>
            <Button small onClick={() => buildingsDown('n')}>-</Button>
        </Row>
        <Row>
            <Button small>Accu</Button>
            <Button small onClick={() => buildingsUp('a')}>+</Button>
            <Button small onClick={() => buildingsDown('a')}>-</Button>
        </Row>
        <Row>
            <Button small>Raffs</Button>
            <Button small onClick={() => buildingsUp('r')}>+</Button>
            <Button small onClick={() => buildingsDown('r')}>-</Button>
        </Row>
    </div>
);
const mapDispatchToProps = dispatch => {
    return {
        buildingsUp: type => dispatch(buildingsUp(type)),
        buildingsDown: type => dispatch(buildingsDown(type)),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(UpgradeBase);
