import React from 'react';
import ContainerRaw from '../style/Container';
import styled from 'styled-components';
import Link from 'next/link';

const Text = styled.div`
    font-size: 1rem;
    color: #292929;
    font-style: italic;
`;

const Container = styled(ContainerRaw)`
    background: bisque;
`;

const Message = () => <Container>
    <Text>
        <Link href="/register"><>Register</></Link> and install the CnC-Eco{' '}
        <Link href="/scripts"><>script</></Link> to see your bases, all seen layouts (in the last 14
        days) and alliance (members have to use the script also)
    </Text>
</Container>;

export default Message;
