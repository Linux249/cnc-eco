//Libs
import React, { Component } from 'react'
import { connect } from 'react-redux';
import LineChart from './LineChart.js'
import BaseHeader from './BaseHeader.js';
import { replaceAllBase } from './../actions/base'
import urlToBase from'../util/parseurl'
import Base from './Base.js'
import BuildingMenu from './BuildingMenu'
import ProductionInfo from './ProductionInfo'
import AppS from '../style/App'
import Body from '../style/Body'
import Area from '../style/Area'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component
{
    componentDidMount(){
        const url = this.props.params.base
        try {
            const base = urlToBase(url)
            this.props.replaceAllBase(base)
        } catch (e) {
            console.warn("Fehler beim Barsen der URL", url)
        }
    }

    render()
    {
        return(
            <AppS >
                <BaseHeader ref="target"/>
                <Body>
                    <BuildingMenu />
                    <Base />
                    <Area>

                        <ProductionInfo />
                        <LineChart />
                    </Area>

                </Body>
            </AppS>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        replaceAllBase: (url) => dispatch(replaceAllBase(url))
    }
}

App = DragDropContext(HTML5Backend)(App)

export default connect(null, mapDispatchToProps)(App);

