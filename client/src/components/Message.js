import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../style/Container';
import styled from 'styled-components';

const Text = styled.div`
    font-size: 1.5rem;
    color: #292929;
    font-style: italic;
`;

export default () => (
    <Container>
        <Text>
            <Link to="/register">Register</Link> and install the CnC-Eco{' '}
            <Link to="/scripts">script</Link> to see your bases, all seen layouts (in the last 14
            days) and alliance (members have to use the script also)
        </Text>
    </Container>
);
