import React from 'react';
import BuildingMenu from '../containers/BuildingMenu';
import UrlInfo from '../containers/UrlInfo';
import Share from '../containers/Share';
import Base from '../components/Base'
import { Row } from '../style/Row';
import Column from '../style/Column';
import Body from '../style/Body';
import Army from '../containers/Army';


export default () => {
    return (
        <Column center>
            <Row>
                <UrlInfo />
                <Share/>
            </Row>
            <Body>
                <BuildingMenu />
                <Base />
            </Body>
            <Body>
                <div />
                <Army />
            </Body>
        </Column>
    );
};
