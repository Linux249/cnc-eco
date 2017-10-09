import React, { Component } from 'react'
import { connect } from 'react-redux';
import Body from '../style/Body'
import Title from '../style/Title'
import Button from '../style/Button'
import Row from '../style/Row'
import Layout from './Layout'
import Login from './Login'

class BaseHeader extends Component
{
    constructor(props) {
        super()
        this.state = {
            layouts: []
        }
    }
    componentWillMount(props) {
        //get layouts from api
        fetch(" http://cnc-eco.herokuapp.com/api/v1/layouts?pl=linux249&w=373&a=126")
            .then(res => res.json())
            .then(layouts => {
                console.log(layouts)
                console.log(layouts)
                this.setState({ layouts })
            })
    }
    render()
    {
        const { layouts } = this.state
        return (
            <Body>
                <Title>{layouts.length}</Title>
                {layouts.map((layout, i) => <Layout key={i} layout={layout}/>)}


            </Body>
        )
    }
}


export default BaseHeader
