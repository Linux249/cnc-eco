import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
        const { auth, path, component: Component } = this.props;
        return (
            <Route
                path={path}
                render={() => (auth ? <Component /> : <Redirect to={{ pathname: '/login' }} />)}
            />
        );
    }
}

export default ProtectedRoute;
