import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import ProtectedRoute from './containers/ProtectedRoute';
import BaseHeader from './containers/BaseHeader.js';
import Bases from './routes/Bases';
import Scripts from './routes/Scripts';
import Layouts from './routes/Layouts';
import Login from './routes/Login';
import Register from './routes/Register';
import Alliance from './routes/Alliance';
import User from './routes/User';
import Home from './routes/Home'
import AppS from './style/App';

class App extends Component {
    render() {
        const { auth, name } = this.props;
        return (
            <Router>
                <AppS>
                    <BaseHeader ref="target" />
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/scripts" component={Scripts} />
                    <ProtectedRoute path="/bases" auth={auth} name={name} component={Bases} />
                    <ProtectedRoute path="/layouts" auth={auth} name={name} component={Layouts} />
                    <ProtectedRoute path="/alliance" auth={auth} name={name} component={Alliance} />
                    <ProtectedRoute path="/user" auth={auth} name={name} component={User} />
                </AppS>
            </Router>
        );
    }
}

export default DragDropContext(HTML5Backend)(
    connect(s => ({ auth: s.auth.isAuthenticated, name: s.player.name }))(App)
);
