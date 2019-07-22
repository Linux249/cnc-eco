import React from 'react';
import BuildingMenu from '../containers/BuildingMenu';
import UrlInfo from '../containers/UrlLoader';
import Share from '../containers/Share';
import Base from '../components/Base';
import Column from '../style/Column';
import Body from '../style/Body';
import Army from '../containers/Army';
import Defense from '../containers/Defense';

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
        <Body>
            <div />
            <Defense />
        </Body>
        <Body>
            <div />
            <Army />
        </Body>
    </Column>
);
