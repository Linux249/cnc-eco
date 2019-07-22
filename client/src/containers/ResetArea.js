import React from 'react';
import { connect } from 'react-redux';
import Button from '../style/Button';
import { replaceArea } from '../store/actions/base';
import Row from '../style/Row';

function ResetArea(props) {
    return (
        <Row>
            <Button>Reset</Button>
            <Button onClick={() => props.replaceArea('buildings')}>buildings</Button>
            <Button onClick={() => props.replaceArea('defense')}>defense</Button>
            <Button onClick={() => props.replaceArea('army')}>army</Button>
        </Row>)
}

export default connect(null, {replaceArea})(ResetArea)
