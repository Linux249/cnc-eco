/**
 * Created by Bombassd on 13.01.2017.
 */
import React, { Component } from 'react'
import './../style/LineChart.css'
import { connect } from 'react-redux'
var Line = require("react-chartjs").Line;
import { Chart } from 'react-google-charts'

class LineChart extends Component
{
    render(){
        // let labels = this.props.prod.time
        // const data = {
        //     labels,
        //     datasets:  [{
        //         label: "tib",
        //         fillColor: "rgba(220,220,220,0)",
        //         strokeColor: "rgba(220,180,0,1)",
        //         pointColor: "rgba(220,180,0,1)",
        //         data: this.props.prod.tib
        //     }, {
        //         label: "cris",
        //         fillColor: "rgba(151,187,205,0)",
        //         strokeColor: "rgba(151,187,205,1)",
        //         pointColor: "rgba(151,187,205,1)",
        //         data: this.props.prod.cris
        //     }, {
        //         label: "power",
        //         fillColor: "rgba(151,187,205,0)",
        //         strokeColor: "rgba(151,187,205,1)",
        //         pointColor: "rgba(151,187,205,1)",
        //         data: this.props.prod.power
        //     },{
        //         label: "credits",
        //         fillColor: "rgba(151,187,205,0)",
        //         strokeColor: "rgba(151,187,205,0)",
        //         pointColor: "rgba(151,187,205,1)",
        //         data: this.props.prod.credits
        //     }]
        // }
        //
        // const option = {
        //     //scaleOverride : true,
        //     scaleStartValue : 0,
        //     scales: {
        //         xAxes: {
        //                 max: 35,
        //                 min: 0,
        //         }
        //     }
        // }

        // let data2 =  [["Days", "Tib", "Cris", "Power", "Credits"]]
        // console.log("DATA FOR GOOGLE CHART")
        // console.log(data2)
        // for (let d = 0; d < this.props.prod.time.length; d++)
        // {
        //     data2.push([this.props.time,this.props.prod.tib[d],this.props.prod.cris[d],this.props.prod.power[d],this.props.prod.credits[d]])
        // }
        // console.log(data2)
        return (
            <div className="chart">
                {/*<Line*/}
                    {/*data={data}*/}
                    {/*options={option}*/}
                    {/*width="800px"*/}
                    {/*height="400px"*/}
                {/*/>*/}
                {/*<Chart*/}
                    {/*chartType="LineChart"*/}
                    {/*data={data2}*/}
                    {/*options={{}}*/}
                    {/*graph_id="LineChart"*/}
                    {/*width="100%"*/}
                    {/*height="400px"*/}

                    {/*legend_toggle*/}
                {/*/>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {

    return ({
        prod: state.productionOverDays
    });
}

export default connect(mapStateToProps)(LineChart)