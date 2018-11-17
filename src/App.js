import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from './containers/ProtectedRoute';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BaseHeader from './containers/BaseHeader.js';
import Bases from './routes/Bases';
import Scripts from './routes/Scripts';
import Layouts from './routes/Layouts';
import Login from './routes/Login';
import AppS from './style/App';
import Register from './routes/Register';
import Alliance from './routes/Alliance';
import User from './routes/User';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        const { auth } = this.props;
        return (
            <Router>
                <AppS>
                    <BaseHeader ref="target" />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/scripts" component={Scripts} />
                    <ProtectedRoute path="/bases" auth={auth} component={Bases} />
                    <ProtectedRoute path="/layouts" auth={auth} component={Layouts} />
                    <ProtectedRoute path="/alliance" auth={auth} component={Alliance} />
                    <ProtectedRoute path="/user" auth={auth} component={User} />
                </AppS>
            </Router>
        );
    }
}

export default DragDropContext(HTML5Backend)(connect(s => ({ auth: s.auth.isAuthenticated }))(App));
