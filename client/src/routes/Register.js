import React from 'react';
import { changeAuthEmail, changeAuthPassword, requestRegister } from '../store/actions/auth';
import connect from 'react-redux/es/connect/connect';
import Input from '../style/Input';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../style/Button';
import { Redirect } from 'react-router';
import { StyledLink } from '../style/Link';

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

function Login(props) {
    const {
        email,
        password,
        isFetching,
        isAuthenticated,
        changeEmail,
        changePassword,
        register,
    } = props;

    return !isAuthenticated ? (
        <Middle>
            <Container>
                <h1>Sign up</h1>
                <Input
                    value={email}
                    onChange={e => changeEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <Input
                    value={password}
                    onChange={e => changePassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    minLength="4"
                />
                <Button onClick={register}>Sign up</Button>
                <StyledLink to="/login">Have an account?</StyledLink>
            </Container>
        </Middle>
    ) : (
        <Redirect to="bases"/>
    );
}

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        password: state.auth.password,
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    changePassword: changeAuthPassword,
    register: requestRegister,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
