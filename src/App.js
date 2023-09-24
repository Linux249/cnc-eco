import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayer } from './store/actions/player';
import { receiveLogin } from './store/actions/auth';
import { LOCAL_STORE } from './config';
// import Reset from './routes/Reset';
// import Resend from './routes/Resend';
// import Demo from './routes/Demo';
// import Admin from './routes/Admin';
// import Feedback from './routes/Feedback';
// import Reports from './routes/Reports';
// import Column from './style/Column';
// import Info from './style/Info';

class App extends Component {
    componentDidMount() {
        const data = localStorage && JSON.parse(localStorage.getItem(LOCAL_STORE));
        if (data) {
            this.props.dispatch(receiveLogin(data));
            this.props.dispatch(updatePlayer(data.user));
        }
    }

    render() {
        // const { auth, name, token } = this.props;
        return (
            <>
                {/*
                    <div>

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
                    <Route path="/reports" component={Reports} />
                    <ProtectedRoute path="/bases" auth={auth} name={name} component={Bases} />
                    <ProtectedRoute
                        path="/layouts/:world?"
                        auth={auth}
                        name={name}
                        component={Layouts}
                    />
                    <ProtectedRoute path="/alliance" auth={auth} name={name} component={Alliance} />
                    <ProtectedRoute path="/user" auth={auth} name={name} component={User} />
                    </div>*/}
            </>
        );
    }
}

export default connect(s => ({
    auth: s.auth.isAuthenticated && s.auth.isVerified,
    name: s.player.name,
}))(App);
