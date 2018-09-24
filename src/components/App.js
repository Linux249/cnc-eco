import React, { Component } from 'react'
import { HashRouter  as Router, Route } from 'react-router-dom'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import BaseHeader from './BaseHeader.js';
import Bases from '../routes/Bases'
import Scripts from '../routes/Scripts'
import Layouts from '../routes/Layouts'
import Login from '../routes/Login'

import AppS from '../style/App'

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
                    <Route path="/login" component={Login}/>
                </AppS>
            </Router>
        )
    }

}

export default DragDropContext(HTML5Backend)(App)

