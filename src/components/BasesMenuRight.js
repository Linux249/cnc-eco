import React, { useState } from 'react';
import LineChart from '../containers/LineChart_G';
import UpgradeBase from '../containers/UpgradeBase';
import Area from '../style/Area';
import Button from '../style/Button';
import { InfoText } from '../style/InfoText';
import Share from './Share';
import ProductionInfo from '../containers/ProductionInfo';
import Column from '../style/Column';

const BasesMenuRight = () => {
    const [showChart, toggleShowChart] = useState(false);
    const [showUpgrade, toggleShowUpgrade] = useState(true);

    return (
        <Column>
            <ProductionInfo />
            <Area>
                <Button onClick={() => toggleShowUpgrade(!showUpgrade)}>Upgrade</Button>
                {showUpgrade && <UpgradeBase />}
                {!showUpgrade && <InfoText>upgrade all buildings of one type</InfoText>}
            </Area>
            <Area>
                <Button onClick={() => toggleShowChart(!showChart)}>Chart</Button>
                {showChart && <LineChart />}
                {!showChart && (
                    <InfoText>
                        shows future production as if all buildings would be upgraded one after one
                    </InfoText>
                )}
            </Area>
            <Share />
        </Column>
    );
};

export default BasesMenuRight;
