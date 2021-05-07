import { signIn } from 'next-auth/client';
import { useState } from 'react';
import Alert from '../../style/Alert';
import Center from '../../style/Center';
import Container from '../../style/Container';
import Form from '../../style/Form';
import Input from '../../style/Input';
import InputGroup from '../../style/InputGroup';
import Label from '../../style/Label';
import Submit from '../../style/Submit';

function Login(props) {
    const { error } = props;

    const [email, setEmail] = useState();

    /**
     * redirect authenticated user and check if they are verified already
     */
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         Router.push(playerName ? '/' : '/user');
    //     }
    // }, []);

    function handleSubmit(e) {
        e.preventDefault();
        signIn('email', {
            email,
            username: 'test username',
            image: 'img test',
            profile: 'test profile',
            callbackUrl: '/user',
        });
    }

    return (
        <Center>
            <Container>
                <Form onSubmit={handleSubmit} name="login" id="login">
                    <h1>Login</h1>
                    {error && <Alert>{error}</Alert>}
                    <InputGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                    </InputGroup>
                    <InputGroup>
                        <Submit type="submit" value="Login" />
                    </InputGroup>
                    After submitting your email we will send you an mail with a link to login.
                </Form>
            </Container>
        </Center>
    );
}

export default Login;
