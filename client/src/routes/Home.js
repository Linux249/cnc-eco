import React from 'react';
import BuildingMenu from '../containers/BuildingMenu';
import UrlInfo from '../containers/UrlLoader';
import Share from '../containers/Share';
import Base from '../components/Base';
import Column from '../style/Column';
import Body from '../style/Body';

export default () => (
    <Column center>
        <Body>
            <BuildingMenu />
            <Base />
            <div>
                <Share />
                <UrlInfo />
            </div>
        </Body>
    </Column>
);
