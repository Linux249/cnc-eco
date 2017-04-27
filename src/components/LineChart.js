/**
 * Created by Bombassd on 13.01.2017.
 */
import React, { Component } from 'react'
import './../style/LineChart.css'
import { connect } from 'react-redux'

import { Chart } from 'react-google-charts'

class LineChart extends Component
{
    constructor(props) {
        super(props);
        //this.changeRange = this.changeRange.bind(this)
        this.state = {
            options: {
                title:"Produktion in X Tagen",  // TODO X MIT AUSWAHL RECHTS
                // legend: {
                //     position: 'bottom'
                //
                // },
                //TODO aktuelle Auswahl oben


                series: {
                    0: {color: '#00ff00',
                        targetAxisIndex: 1},
                    1: {color: '#0000ff',
                        targetAxisIndex: 1},
                    2: {color: '#99bbff',
                        targetAxisIndex: 1},
                    3: {color: '#ffdb32',
                        targetAxisIndex: 1}
                },
                trendlines: {
                    0: {type: 'exponential', color: '#00ff00', opacity: 1},
                    1: {type: 'exponential', color: '#0000ff', opacity: 1},
                    2: {type: 'exponential', color: '#99bbff', opacity: 1},
                    3: {type: 'exponential', color: '#ffdb32', opacity: 1},
                },
                curveType: 'function',
                vAxes: {
                    0: {textPosition: 'none'},
                    1: {
                        viewWindow: {
                            max:10000000,
                            min:0
                        }
                    }
                },
                hAxis: {
                    viewWindow: {
                        max:120,
                        min:0
                    }
                },

                width:"100%"
            }
        }
    }

    changeRange(range) {
        this.setState(prevState => {
            //console.log(prevState.options.vAxes[1].viewWindow.max)
            prevState.options.vAxes[1].viewWindow.max =  range
            //console.log(prevState.options.vAxes[1].viewWindow.max)
            return {
                ...prevState
                //prevState.vAxes[1].maxValue: 50000000
            }
        })
    }

    changeDays(days) {
        this.setState(prevState => {
            console.log(prevState.options)
            prevState.options.hAxis.viewWindow.max =  days
            console.log(prevState.options.hAxis.viewWindow.max)
            return {...prevState}
        })
    }

    render(){
        const { data } = this.props
        const data2 =  [["Days", "Tib", "Cris", "Power", "Credits"]]
        data.map(data => data2.push([data.time, data.prod.tib, data.prod.cris, data.prod.power, data.prod.credits]))


        return (
            <div className="chartRow">
                <div className="chart">
                    <div className="range">
                        <div className="rangeButton" onClick={() => this.changeRange(10000)}>10k</div>
                        <div className="rangeButton" onClick={() => this.changeRange(100000)}>100k</div>
                        <div className="rangeButton" onClick={() => this.changeRange(1000000)}>1M</div>
                        <div className="rangeButton" onClick={() => this.changeRange(10000000)}>10M</div>
                        <div className="rangeButton" onClick={() => this.changeRange(100000000)}>100M</div>
                        <div className="rangeButton" onClick={() => this.changeRange(1000000000)}>1G</div>
                        <div className="rangeButton" onClick={() => this.changeRange(10000000000)}>10G</div>
                        <div className="rangeButton" onClick={() => this.changeRange(100000000000)}>100G</div>
                        <div className="rangeButton" onClick={() => this.changeRange(1000000000000)}>1T</div>
                        <div className="rangeButton" onClick={() => this.changeRange(10000000000000)}>10T</div>
                    </div>
                    <Chart
                        chartType="LineChart"
                        data={data2}
                        options={this.state.options}
                        graph_id="LineChart"
                        width="600px"
                        height="400px"
                        legend_toggle
                    />
                    <div className="days">
                        <div className="daysButton" onClick={() => this.changeDays(30)}>30</div>
                        <div className="daysButton" onClick={() => this.changeDays(60)}>60</div>
                        <div className="daysButton" onClick={() => this.changeDays(90)}>90</div>
                        <div className="daysButton" onClick={() => this.changeDays(120)}>120</div>
                    </div>
                </div>
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