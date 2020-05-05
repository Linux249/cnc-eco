import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import Input from '../../style/Input';
import { changeAuthEmail, changeAuthPassword, requestRegister } from '../../store/actions/auth';
import Form from '../../style/Form';
import Label from '../../style/Label';
import InputGroup from '../../style/InputGroup';
import Submit from '../../style/Submit';
import Center from '../../style/Center';
import Container from '../../style/Container';
import Alert from '../../style/Alert';

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

    /**
     * redirect authenticated user and check if they are verified already
     */
    useEffect(() => {
        if (isAuthenticated) {
            Router.push(isVerified ? '/user' : '/login');
        }
    }, []);

    return (
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
                    Already have an account?{' '}
                    <Link href="/login">
                        <a>Sign in</a>
                    </Link>
                </Form>
            </Container>
        </Center>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
