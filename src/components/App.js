//Libs
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HashRouter  as Router, Route } from 'react-router-dom'
import BaseHeader from './BaseHeader.js';
import { replaceAllBase } from './../actions/base'
import Bases from '../routes/Bases.js'
import Scripts from '../routes/Scripts.js'
import Layouts from '../routes/Layouts.js'

import AppS from '../style/App'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component
{
    render()
    {
        return(

            <Router>
                <AppS >
                    <BaseHeader ref="target"/>
                    <Route path="/bases" component={Bases}/>
                    <Route path="/scripts" component={Scripts}/>
                    <Route path="/layouts" component={Layouts}/>
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

