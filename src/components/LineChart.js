/**
 * Created by Bombassd on 13.01.2017.
 */
import React, { Component } from 'react'
import '../style/LineChart'
import Button from './../style/Button'
import { backgroundColor } from './../style/constants'
import Row from './../style/Row'
import ChartS from './../style/LineChart'
import Column from './../style/Column'
import { connect } from 'react-redux'
import { shortenNumber } from './../services/menu'
import { Chart } from 'react-google-charts'
import { futureProduction } from '../util/production.js'

// Colors for lines
const tibColor = '#23ff1d'
const crisColor = '#0000f1'
const powerColor = '#99bbf1'
const creditsColor = '#ffdb32'

class LineChart extends Component
{


    constructor(props) {
        super(props);
        //this.changeRange = this.changeRange.bind(this)
        this.state = {
            showRealLine: true,
            showTrendLine: true,
            options: {
                title:"Produktion in 120 Tagen",  // TODO X MIT AUSWAHL RECHTS
                backgroundColor: backgroundColor,

                //TODO aktuelle Auswahl oben
                series: {
                    0: {color: tibColor, targetAxisIndex: 1},
                    1: {color: crisColor, targetAxisIndex: 1},
                    2: {color: powerColor, targetAxisIndex: 1},
                    3: {color: creditsColor, targetAxisIndex: 1}
                },
                trendlines: {
                    0: {type: 'exponential', color: tibColor},
                    1: {type: 'exponential', color: crisColor},
                    2: {type: 'exponential', color: powerColor},
                    3: {type: 'exponential', color: creditsColor},
                },
                curveType: 'function',
                vAxes: {
                    1: {
                        viewWindow: {
                            max:10000000,
                            min:0
                        }
                    }
                },
                hAxis: {
                    title: 'Tage',
                    viewWindow: {
                        max:120,
                        min:0
                    }
                }
            }
        }
    }

    changeRange(range) {
        this.setState(prevState => {
            prevState.options.vAxes[1].viewWindow.max =  range
            return { ...prevState}
        })
    }

    changeDays(days) {
        this.setState(prevState => {
            prevState.options.title = "Produktion in " +  days + " Tagen"
            prevState.options.hAxis.viewWindow.max =  days
            return {...prevState}
        })
    }
    toogleRealLine(){
        this.setState(prevState => {
            if (!("lineWidth" in prevState.options.series[0])) prevState.options.series =  {
                0: {color: tibColor, targetAxisIndex: 1, lineWidth: 0 },
                1: {color: crisColor, targetAxisIndex: 1, lineWidth: 0 },
                2: {color: powerColor, targetAxisIndex: 1, lineWidth: 0 },
                3: {color: creditsColor, targetAxisIndex: 1, lineWidth: 0 }
            }
            else prevState.options.series =  {
                    0: {color: tibColor, targetAxisIndex: 1},
                    1: {color: crisColor, targetAxisIndex: 1},
                    2: {color: powerColor, targetAxisIndex: 1},
                    3: {color: creditsColor, targetAxisIndex: 1}
            }
            return {...prevState}
        })
    }

    toogleTrendLine(){
        this.setState(prevState => {
            // console.log(prevState)
            if ("trendlines" in prevState.options) delete prevState.options.trendlines
            else prevState.options.trendlines =  {
                0: {type: 'exponential', color: tibColor},
                1: {type: 'exponential', color: crisColor},
                2: {type: 'exponential', color: powerColor},
                3: {type: 'exponential', color: creditsColor}
            }
            return {...prevState}
        })
    }

    render(){
        const { buildings } = this.props
        const data = futureProduction(buildings)
        const { options } = this.state
        const toggleTrendLines = ("trendlines" in options)
        const toogleRealLines = !("lineWidth" in options.series[0])
        const activeRange = options.vAxes[1].viewWindow.max
        const activeDays = options.hAxis.viewWindow.max

        const data2 =  [["Days", "Tib", "Kris", "Power", "Credits"]]
        data.map(data => data2.push([data.time, data.prod.tib, data.prod.kris, data.prod.power, data.prod.credits]))

        const ranges = [10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1000000000000]
        const days = [30, 60, 90, 120]
        return (
            <div>

                <Row>
                    {
                        ranges.map(n => (
                            <Button
                                key={n}
                                onClick={() => this.changeRange(n)}
                                active={(activeRange === n)}
                            >
                                {shortenNumber(n)}
                            </Button>
                            )
                        )
                    }
                </Row>
                <Row>
                    {

                        days.map(n => (
                            <Button
                                key={n}
                                onClick={() => this.changeDays(n)}
                                active={(activeDays === n)}
                            >
                                {n + " Tage"}
                            </Button>
                        ))
                    }


                    <Button
                        onClick={() => this.toogleRealLine()}
                        active={(toogleRealLines)}
                    >
                        Real Line
                    </Button>
                    <Button
                        onClick={() => this.toogleTrendLine()}
                        active={(toggleTrendLines)}
                    >
                        Trend Line
                    </Button>
                </Row>
                <Row>
                    <ChartS>
                        <Chart
                            chartType="LineChart"
                            data={data2}
                            options={this.state.options}
                            graph_id="LineChart"
                            width="100%"
                            legend_toggle
                        />
                    </ChartS>
                    <Column>

                    </Column>

                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        buildings: state.base.buildings
    });
}

export default connect(mapStateToProps)(LineChart)