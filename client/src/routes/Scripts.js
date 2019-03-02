import React from 'react';
import styled from 'styled-components';
import { InfoText } from '../style/InfoText';
import Body from '../style/Body';
import Area from '../style/Area';

const Description = styled.div`
    font-weight: 300;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const Titel = styled.div`
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
`;

export default () => (
    <Body>
        <div />
        <Column>
            <Area>
                <Titel>C&C:TA CnC-Eco</Titel>
                <Description>
                    The 'CnC:TA CnC-Eco' Script provides the upload functionality for your ingame
                    data and give you access to a base scanner witch save all scanned bases.
                </Description>
                <a
                    target="_blank"
                    href="https://greasyfork.org/en/scripts/33978-c-c-ta-cnc-eco"
                >
                    <Area>https://greasyfork.org/en/scripts/33978-c-c-ta-cnc-eco</Area>
                </a>
                <InfoText>This Script is necessary for full usage of cnc-eco.</InfoText>
            </Area>

            <Area>
                <Titel>CnC-Eco Link Button</Titel>
                <Description>
                    Easy sharing Bases with others. Create and directly open a Link with the
                    information of the selected Base
                </Description>
                <a
                    target="_blank"
                    href="https://greasyfork.org/en/scripts/27660-c-c-ta-cnc-eco-link-button"
                >
                    <Area>https://greasyfork.org/en/scripts/27660-c-c-ta-cnc-eco-link-button</Area>
                </a>
            </Area>
        </Column>
        <div />
    </Body>
);
