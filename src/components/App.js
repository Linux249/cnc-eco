//Libs
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BaseHeader from './BaseHeader.js';
import { replaceAllBase } from './../actions/base'
import Bases from './Bases.js'

import AppS from '../style/App'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component
{
    componentDidMount(){
        // const url = this.props.params.base
        // try {
        //     const base = urlToBase(url)
        //     this.props.replaceAllBase(base)
        // } catch (e) {
        //     console.warn("Fehler beim Barsen der URL", url)
        // }
    }

    render()
    {
        return(

            <Router>
                <AppS >
                    <BaseHeader ref="target"/>
                    <Route path="/" component={Bases}/>
                    <Route path="/scripts" component={Bases}/>
                    <Route path="/layouts" component={Bases}/>
                </AppS>
            </Router>
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

