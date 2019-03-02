import React from 'react';
import { changeAuthEmail, changeAuthPassword, requestLogin } from '../store/actions/auth';
import connect from 'react-redux/es/connect/connect';
import Input from '../style/Input';
import styled from 'styled-components';
import { Button } from '../style/Button';
import { Redirect } from 'react-router';
import { StyledLink } from '../style/Link';
import Area from '../style/Area';

const Middle = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 60rem;
    margin: 1rem;
`;

function Login(props) {
    const { email, password, error, isAuthenticated, changeEmail, changePassword, login } = props;

    return !isAuthenticated ? (
        <Middle>
            <Area>
                <Container>
                    <h1>Login</h1>
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
                    <StyledLink to="/register">Need an account?</StyledLink>
                </Container>
            </Area>
        </Middle>
    ) : (
        <Redirect to="/"/>
    );
}

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        password: state.auth.password,
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
