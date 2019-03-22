import React from 'react';
import LineChart_G from '../containers/LineChart_G';
import LineChart from '../containers/LineChart'
import UpgradeBase from '../containers/UpgradeBase';
import Area from '../style/Area';

function createFakeData () {
    const data =[]
    for (let x = 0; x <= 30; x++) {
        const random = Math.random()
        const temp = data.length > 0 ? data[data.length -1].y : 50
        const y = random >= 0.45 ? temp + Math.floor(random*20) : temp - Math.floor(random*20)
        data.push({x,y})
    }
    return data
}



export default () => (
    <Area small>
        <LineChart_G />
        <LineChart data={createFakeData()} />
        <UpgradeBase />
    </Area>
);
