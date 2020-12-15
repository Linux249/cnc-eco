import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { changeAuthEmail, requestResendToken } from '../../store/actions/auth';
import Input from '../../style/Input';
import InputGroup from '../../style/InputGroup';
import Label from '../../style/Label';
import Container from '../../style/Container';
import Form from '../../style/Form';
import Submit from '../../style/Submit';
import Center from '../../style/Center';
import Alert from '../../style/Alert';

function Login(props) {
    const { email, error, isAuthenticated, changeEmail, resend, playerName } = props;

    function handleSubmit(e) {
        e.preventDefault();
        resend();
    }

    /**
     * redirect authenticated user and check if they are verified already
     */
    useEffect(() => {
        if (isAuthenticated) {
            Router.push(playerName ? '/' : '/user');
        }
    }, []);

    return (
        <Center>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h1>Resend token</h1>
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
                        <Submit type="submit" value="Resend" />
                    </InputGroup>
                    No account?{' '}
                    <Link href="/register">
                        <a>Create one</a>
                    </Link>
                </Form>
            </Container>
        </Center>
    );
}

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated && state.auth.isVerified,
        playerName: state.player.name,
    };
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    resend: requestResendToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
