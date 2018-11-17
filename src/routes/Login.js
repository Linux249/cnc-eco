import React, { Component } from 'react';
import { changeAuthEmail, changeAuthPassword, requestLogin } from '../store/actions/auth';
import connect from 'react-redux/es/connect/connect';
import Input from '../style/Input';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../style/Button';
import {Redirect} from 'react-router'

const Middle = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 60rem;
`;

class Login extends Component {
    render() {
        const {
            email,
            password,
            error,
            isFetching,
            isAuthenticated,
            changeEmail,
            changePassword,
            login,
        } = this.props;

        return !isAuthenticated ? (
            <Middle>
                <Container>
                    <h1>Sign In</h1>
                    <Link to="/register">Need an account?</Link>
                    {error && <div>{error}</div>}
                    <Input
                        name="name"
                        value={email}
                        onChange={e => changeEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                    />
                    <Input
                        name="password"
                        value={password}
                        onChange={e => changePassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        minLength="4"
                    />
                    <Button onClick={() => login()}>Sign in</Button>
                </Container>
            </Middle>
        ) : (
            <Redirect to="bases" />
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        password: state.auth.password,
        isFetching: state.auth.isFetching,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    changePassword: changeAuthPassword,
    login: requestLogin,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
