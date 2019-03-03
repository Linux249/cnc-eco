import React from 'react';
import BuildingMenu from '../containers/Buildings';
import UrlInfo from '../containers/UrlInfo';
import Share from '../containers/Share';
import Base from '../components/Base'
import { Row } from '../style/Row';
import Column from '../style/Column';
import Body from '../style/Body';


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
        </Column>
    );
};
