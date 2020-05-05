import React from 'react';
import BuildingMenu from '../../containers/BuildingMenu';
import Share from '../../components/Share';
import Base from '../../components/Base';
import Column from '../../style/Column';
import Body from '../../style/Body';
import Army from '../../components/Army';
import Defense from '../../components/Defense';
import ResetArea from '../../containers/ResetArea';
import Message from '../../components/Message';
import ProductionInfo from '../../containers/ProductionInfo';
import Backend from 'react-dnd-html5-backend-cjs'
import { DndProvider } from 'react-dnd-cjs'

export default () => (
    <Column center>
        <DndProvider backend={Backend}>
            <Body large>
                <BuildingMenu area="buildings" />
                <Base />
                <div>
                    <ProductionInfo />
                    <Share />
                    <ResetArea />
                    {/*<UrlLoader />*/}
                    <Message />
                </div>
                <BuildingMenu area="defense" />
                <Defense />
                <div />
                <BuildingMenu area="army" />
                <Army />
            </Body>
        </DndProvider>
    </Column>
);
