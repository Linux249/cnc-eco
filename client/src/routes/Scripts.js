import React from 'react';
import styled from 'styled-components'

const ExtLink = styled.a`
  font-size: 1.3rem;
  
  margin: 0.2rem;
`

const Description = styled.div`

`

const Info = styled.div`
  font-size: 0.7rem;
`

const Titel = styled.div`
    font-size: 1.5rem;
`

export default () => <div>
    <Titel>Liste mit Scripten</Titel>
    <ExtLink href="https://greasyfork.org/en/scripts/33978-c-c-ta-cnc-eco">C&C:TA CnC-Eco</ExtLink>
    <Info>This Script is neccesary for full usage of cnc-eco.</Info>
    <Description>
        The 'CnC:TA CnC-Eco' Script provides the upload functionality for your ingame data and give you access to a
        base scanner witch save all scanned bases.
    </Description>
    <ExtLink href="https://greasyfork.org/en/scripts/27660-c-c-ta-cnc-eco-link-button">CnC-Eco Link Button</ExtLink>
    <Description>Easy sharing Bases with others. Create and directly open a Link with the information of the selected Base</Description>
</div>;
