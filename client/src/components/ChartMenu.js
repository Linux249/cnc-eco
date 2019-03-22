import React from 'react';
import LineChart from '../containers/LineChart_G';
import UpgradeBase from '../containers/UpgradeBase';
import Area from '../style/Area';

export default () => (
    <Area small>
        <LineChart />
        <UpgradeBase />
    </Area>
);
