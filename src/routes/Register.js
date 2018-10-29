import React, { Component } from 'react'
import {changeAuthEmail, changeAuthPassword, requestRegister} from '../store/actions/auth'
import connect from 'react-redux/es/connect/connect'
import Input from '../style/Input'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Button} from '../style/Button'

const Middle = styled.div`
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 60rem;
`

class Login extends Component {

    render() {

        const {email, password, isFetching, isAuthenticated, changeEmail, changePassword, register } = this.props

        return (
            <Middle>
                <Container>
                    <h1>Sign up</h1>
                    <Link to='/login'>Have an account?</Link>
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
                </Container>
            </Middle>
        )
    }
}

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        password: state.auth.password,
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    changePassword: changeAuthPassword,
    register: requestRegister,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)