import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Input from '../../style/Input';
import {
    changeAuthEmail,
    changeAuthPassword,
    requestEmail,
    resetPassword,
} from '../../store/actions/auth';
import InputGroup from '../../style/InputGroup';
import Label from '../../style/Label';
import Container from '../../style/Container';
import Form from '../../style/Form';
import Submit from '../../style/Submit';
import Center from '../../style/Center';
import Alert from '../../style/Alert';
import Router, { useRouter } from 'next/router';

function Reset(props) {
    const {
        email,
        password,
        error,
        isAuthenticated,
        changeEmail,
        changePassword,
        requestEmail,
        resetPassword,
        playerName,
        match,
    } = props;

    function handleSubmit(e) {
        e.preventDefault();
        !token ? requestEmail() : resetPassword(token);
    }
    const router = useRouter();

    const { token } = router.query
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
                    <h1>Reset password</h1>
                    {error && <Alert>{error}</Alert>}
                    {!token ? (
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
                    ) : (
                        <InputGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                value={password}
                                onChange={e => changePassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                minLength="7"
                            />
                        </InputGroup>
                    )}
                    <InputGroup>
                        <Submit type="submit" value={token ? 'Update password' : 'Send email'} />
                    </InputGroup>
                    No account? <Link href="/register"><a>Create one</a></Link>
                    <br />
                    <br />
                    Email verification expired? <Link href="/resend"><a>Resend token</a></Link>
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
        isAuthenticated: state.auth.isAuthenticated && state.auth.isVerified,
        playerName: state.player.name,
    };
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    changePassword: changeAuthPassword,
    requestEmail,
    resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
