import React, { Component } from 'react';
import ProductionInfo from '../containers/ProductionInfo';
import LineChart from '../containers/LineChart';
import UpgradeBase from '../containers/UpgradeBase';
import Area from '../style/Area';

export default () => (
    <Area>
        <LineChart />
        <UpgradeBase />
    </Area>
);
