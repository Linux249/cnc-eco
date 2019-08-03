import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../style/Input';
import { changeAuthEmail, requestResendToken } from '../store/actions/auth';
import InputGroup from '../style/InputGroup';
import Label from '../style/Label';
import Container from '../style/Container';
import Form from '../style/Form';
import Submit from '../style/Submit';
import Center from '../style/Center';
import Alert from '../style/Alert';

function Login(props) {
    const { email, error, isAuthenticated, changeEmail, resend, playerName } = props;

    function handleSubmit(e) {
        e.preventDefault();
        resend();
    }

    return !isAuthenticated ? (
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
                    No account? <Link to="/register">Create one</Link>
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
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated && state.auth.isVerified,
        playerName: state.player.name,
    };
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    resend: requestResendToken,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
