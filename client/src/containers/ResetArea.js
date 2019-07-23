import React from 'react';
import { connect } from 'react-redux';
import Button from '../style/Button';
import { replaceArea } from '../store/actions/base';
import Row from '../style/Row';
import Title from '../style/Title';
import Container from '../style/Container';

function ResetArea(props) {
    return (
        <Container>
            <Title>Reset</Title>
            <Row>
                <Button onClick={() => props.replaceArea('buildings')}>buildings</Button>
                <Button onClick={() => props.replaceArea('defense')}>defense</Button>
                <Button onClick={() => props.replaceArea('army')}>army</Button>
            </Row>
        </Container>
    );
}

export default connect(
    null,
    { replaceArea }
)(ResetArea);
