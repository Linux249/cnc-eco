import React, { useState } from 'react';
import LineChart from '../containers/LineChart_G';
import UpgradeBase from '../containers/UpgradeBase';
import Area from '../style/Area';
import Button from '../style/Button';

export default () => {
    const [showChart, toggleShowChart] = useState(false);
    const [showUpgrade, toggleShowUpgrade] = useState(true);

    return (
        <Area small>
            <Button onClick={() => toggleShowChart(!showChart)}>Chart</Button>
            {showChart && <LineChart />}
            <Button onClick={() => toggleShowUpgrade(!showUpgrade)}>Upgrade</Button>
            {showUpgrade && <UpgradeBase />}
        </Area>
    );
};
