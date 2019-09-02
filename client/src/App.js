import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import BaseHeader from './containers/BaseHeader.js';
import Bases from './routes/Bases';
import Scripts from './routes/Scripts';
import Layouts from './routes/Layouts';
import Login from './routes/Login';
import Register from './routes/Register';
import Alliance from './routes/Alliance';
import User from './routes/User';
import Home from './routes/Home';
import AppS from './style/App';
import LoadingLine from './style/LoadingLine';
import { S } from './routes/S';
import { B } from './routes/B';
import { updatePlayer } from './store/actions/player';
import { receiveLogin } from './store/actions/auth';
import { LOCAL_STORE } from './config';
import Reset from './routes/Reset';
import Resend from './routes/Resend';
import Demo from './routes/Demo';
import Admin from './routes/Admin';
import 'react-tippy/dist/tippy.css';
import Feedback from './routes/Feedback';

class App extends Component {
    componentWillMount() {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORE));
        if (data) {
            this.props.dispatch(receiveLogin(data));
            this.props.dispatch(updatePlayer(data.user));
        }
    }

    render() {
        const { auth, name } = this.props;
        return (
            <Router>
                <AppS>
                    <BaseHeader />
                    <LoadingLine />
                    <Route path="/" exact component={Home} />
                    <Route path="/s/:url" component={S} />
                    <Route path="/b/:url" component={B} />
                    <Route path="/scripts" component={Scripts} />
                    <Route path="/demo" component={Demo} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/resend" component={Resend} />
                    <Route path="/reset/:token?" component={Reset} />
                    <Route path="/feedback" component={Feedback} />
                    <ProtectedRoute path="/bases" auth={auth} name={name} component={Bases} />
                    <ProtectedRoute
                        path="/layouts/:world"
                        auth={auth}
                        name={name}
                        component={Layouts}
                    />
                    <ProtectedRoute path="/alliance" auth={auth} name={name} component={Alliance} />
                    <ProtectedRoute path="/user" auth={auth} name={name} component={User} />
                </AppS>
            </Router>
        );
    }
}

export default connect(s => ({
    auth: s.auth.isAuthenticated && s.auth.isVerified,
    name: s.player.name,
}))(App);
