/**
 * Created by Bombassd on 13.01.2017.
 */
import React from 'react'
import { Chart } from 'react-google-charts'

export class LineChart extends React.Component
{
    render(){

        return (
            <div className={"chart"}>
                <Chart
                    chartType="LineChart"
                    data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
                    options={{}}
                    graph_id="LineChart"
                    width="100%"
                    height="400px"

                    legend_toggle
                />
            </div>
        )
    }
}