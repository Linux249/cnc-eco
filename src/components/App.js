import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BaseHeader from './BaseHeader.js';
import Bases from '../routes/Bases';
import Scripts from '../routes/Scripts';
import Layouts from '../routes/Layouts';
import Login from '../routes/Login';
import AppS from '../style/App';
import Register from '../routes/Register';
import User from '../routes/User';

class App extends Component {
    render() {
        return (
            <Router>
                <AppS>
                    <BaseHeader ref="target" />
                    <Route path="/bases" component={Bases} />
                    <Route path="/scripts" component={Scripts} />
                    <Route path="/layouts" component={Layouts} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/user" component={User} />
                </AppS>
            </Router>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
