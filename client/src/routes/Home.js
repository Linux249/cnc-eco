import React from 'react';
import BuildingMenu from '../containers/BuildingMenu';
import Share from '../components/Share';
import Base from '../components/Base';
import Column from '../style/Column';
import Body from '../style/Body';
import Army from '../components/Army';
import Defense from '../components/Defense';
import ResetArea from '../containers/ResetArea';
import Message from '../components/Message';
import ProductionInfo from '../containers/ProductionInfo';

export default () => (
    <Column center>
        <div>This side is still in Development. Be aware that all data may be deleted while in beta/before release. </div>
        <Body>
            <BuildingMenu area="buildings" />
            <Base />
            <div>
                <Share />
                <ProductionInfo />
                {/*<UrlLoader />*/}
                <ResetArea />
                <Message />
            </div>
            <BuildingMenu area="defense" />
            <Defense />
            <div />
            <BuildingMenu area="army" />
            <Army />
        </Body>
    </Column>
);
