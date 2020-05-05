import React from 'react';
import styled from 'styled-components';
import { InfoText } from '../../style/InfoText';
import Body from '../../style/Body';
import Area from '../../style/Area';
import Title from '../../style/Title';

const Description = styled.div`
    font-weight: 300;
    font-size: 1rem;
    margin: 5px;
`;

const Link = styled.div`
    margin: 0.5rem;
    font-weight: 600;
`;


export default () => (
    <Body>
        <div />
        <div>
            <Area>
                <Title>C&C:TA CnC-Eco</Title>
                <Description>
                    The 'CnC:TA CnC-Eco' script provides the upload functionality for your ingame
                    data and give you access to a base scanner witch save all scanned bases.
                </Description>
                <a target="_blank" href="https://greasyfork.org/en/scripts/33978-c-c-ta-cnc-eco">
                    <Link>https://greasyfork.org/en/scripts/33978-c-c-ta-cnc-eco</Link>
                </a>
                <InfoText>This Script is necessary for full usage of cnc-eco.</InfoText>
            </Area>

            <Area>
                <Title>CnC-Eco Link Button</Title>
                <Description>
                    Easy sharing Bases with others. Create and directly open a Link with the
                    information of the selected Base
                </Description>
                <a
                    target="_blank"
                    href="https://greasyfork.org/en/scripts/27660-c-c-ta-cnc-eco-link-button"
                >
                    <Link>https://greasyfork.org/en/scripts/27660-c-c-ta-cnc-eco-link-button</Link>
                </a>
            </Area>
        </div>
        <div />
    </Body>
);
