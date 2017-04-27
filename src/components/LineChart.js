/**
 * Created by Bombassd on 13.01.2017.
 */
import React, { Component } from 'react'
import './../style/LineChart.css'
import { connect } from 'react-redux'

import { Chart } from 'react-google-charts'

class LineChart extends Component
{
    render(){
        const { data } = this.props
        const data2 =  [["Days", "Tib", "Cris", "Power", "Credits"]]
        data.map(data => data2.push([data.time, data.prod.tib, data.prod.cris, data.prod.power, data.prod.credits]))
        return (
            <div className="chartRow">
                <Chart
                    chartType="LineChart"
                    data={data2}
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

function mapStateToProps(state) {

    return ({
        data: state.production.data
    });
}

export default connect(mapStateToProps)(LineChart)