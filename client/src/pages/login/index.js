import { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import Input from '../../style/Input';
import { changeAuthEmail, changeAuthPassword, requestLogin } from '../../store/actions/auth';
import InputGroup from '../../style/InputGroup';
import Label from '../../style/Label';
import Container from '../../style/Container';
import Form from '../../style/Form';
import Submit from '../../style/Submit';
import Center from '../../style/Center';
import Alert from '../../style/Alert';

function Login(props) {
    const {
        email,
        password,
        error,
        isAuthenticated,
        changeEmail,
        changePassword,
        login,
        playerName,
    } = props;

    /**
     * redirect authenticated user and check if they are verified already
     */
    useEffect(() => {
        if (isAuthenticated) {
            Router.push(playerName ? '/' : '/user');
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        login();
    }

    return (
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
                    No account?{' '}
                    <Link href="/register">
                        <a>Create one</a>
                    </Link>
                    <br />
                    <br />
                    Email verification expired?{' '}
                    <Link href="/resend">
                        <a>Resend token</a>
                    </Link>
                    <br />
                    <br />
                    Forget password{' '}
                    <Link href="/reset">
                        <a>Reset password</a>
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
        isAuthenticated: state.auth.isAuthenticated && state.auth.isVerified,
        playerName: state.player.name,
    };
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    changePassword: changeAuthPassword,
    login: requestLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
