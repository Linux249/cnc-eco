import React, { Component } from 'react'
import {changeAuthEmail, changeAuthPassword} from '../store/actions/auth'
import connect from 'react-redux/es/connect/connect'
import Input from '../style/Input'
import Column from '../style/Column'
import styled from 'styled-components'
// TODO Login + Register buttons change to "Profil" Button which has logout, settings and so on

const Middle = styled.div`
    display: flex;
    justify-content: center;

`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    
`

class Login extends Component {

    render() {

        const {email, password, isFetching, isAuthenticated, changeEmail, changePassword } = this.props

        return (
            <Middle>
                <Container>
                    <Title>Sign In</Title>
                    <div>Need an account?</div>
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
                    />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)