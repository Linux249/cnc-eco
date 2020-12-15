import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { InfoText } from '@/style/InfoText';
import Body from '../../style/Body';
import Area from '../../style/Area';
import Title from '../../style/Title';


const Description = styled.div`
    font-weight: 300;
    font-size: 1rem;
    margin: 5px;
`;

const A = styled.a`
    margin: 0.5rem;
    font-weight: 600;
`;

const data = [{
    title: 'C&C:TA CnC-Eco',
    text: 'The \'CnC:TA CnC-Eco\' script provides the upload functionality for your ingame data and give you access to a base scanner witch save all scanned bases.',
    href: 'https://greasyfork.org/en/scripts/33978-c-c-ta-cnc-eco',
    info: 'This Script is necessary for full usage of cnc-eco.',
}, {
    title: 'CnC-Eco Link Button',
    text: 'Easy sharing Bases with others. Create and directly open a Link with the information of the selected Base',
    href: 'https://greasyfork.org/en/scripts/27660-c-c-ta-cnc-eco-link-button',
    info: '',
}];


const Index = () => <Body>
    <div />
    <div>
        {data.map((e) => <Area>
            <Title>{e.title}</Title>
            <Description>
                {e.text}
            </Description>
            <Link href={e.href}>
                <A target='_blank'>{e.href}</A>
            </Link>
            <InfoText>{e.info}</InfoText>
        </Area>)}
    </div>
    <div />
</Body>;


export default Index;
