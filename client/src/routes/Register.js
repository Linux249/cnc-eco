import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../style/Input';
import { changeAuthEmail, changeAuthPassword, requestRegister } from '../store/actions/auth';
import Form from '../style/Form';
import Label from '../style/Label';
import InputGroup from '../style/InputGroup';
import Submit from '../style/Submit';
import Center from '../style/Center';
import Container from '../style/Container';
import Alert from '../style/Alert';
import Row from '../style/Row';

function Register(props) {
    const {
        email,
        password,
        error,
        isAuthenticated,
        isVerified,
        changeEmail,
        changePassword,
        register,
    } = props;

    function handleSubmit(e) {
        e.preventDefault();
        register();
    }

    return !isAuthenticated ? (
        <Center>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h1>Sign up</h1>
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
                        <Submit type="submit" value="Sign Up" />
                    </InputGroup>
                    Already have an account? <Link to="/login">Sign in</Link>
                </Form>
            </Container>
        </Center>
    ) : isVerified ? (
        <Redirect to="/user" />
    ) : (
        <Redirect to="/login" />
    );
}

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        isVerified: state.auth.isVerified,
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
)(Register);
