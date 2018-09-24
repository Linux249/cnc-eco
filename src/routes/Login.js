import React, { Component } from 'react'

// TODO Login + Register buttons change to "Profil" Button which has logout, settings and so on

class Login extends Component {


    render() {

        return (
            <div {...this.props}>
                {this.props.toString()}
            </div>
        )
    }
}

export default Login