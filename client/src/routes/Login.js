import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../style/Input';
import {
    changeAuthEmail,
    changeAuthPassword,
    requestLogin,
    requestResendToken,
} from '../store/actions/auth';
import InputGroup from '../style/InputGroup';
import Label from '../style/Label';
import Container from '../style/Container';
import Form from '../style/Form';
import Submit from '../style/Submit';
import Center from '../style/Center';
import Alert from '../style/Alert';
import Button from '../style/Button';

function Login(props) {
    const {
        email,
        password,
        error,
        isAuthenticated,
        changeEmail,
        changePassword,
        login,
        resend,
        playerName,
    } = props;

    function handleSubmit(e) {
        e.preventDefault();
        login();
    }

    return !isAuthenticated ? (
        <Center>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <Alert>{error}</Alert>}
                    <InputGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            value={email}
                            onChange={e => changeEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            value={password}
                            onChange={e => changePassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            minLength="4"
                        />
                    </InputGroup>
                    <InputGroup>
                        <Submit type="submit" value="Login" />
                    </InputGroup>
                    <div>New to CnC-Exo?</div>
                    <Link to="/register">Sign Up</Link>
                    <br />
                    <br />
                    <div>Email verification expired?</div>
                    <Button onClick={resend}>Resend token</Button>
                </Form>
            </Container>
        </Center>
    ) : playerName ? (
        <Redirect to="/" />
    ) : (
        <Redirect to="/user" />
    );
}

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated && state.auth.isVerified,
        playerName: state.player.name,
    };
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    changePassword: changeAuthPassword,
    login: requestLogin,
    resend: requestResendToken,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
