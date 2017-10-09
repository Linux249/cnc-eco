import React, { Component } from 'react'
import { connect } from 'react-redux';
import Body from '../style/Body'
import Title from '../style/Title'
// import Button from '../style/Button'
// import Row from '../style/Row'
import Layout from './Layout'


class BaseHeader extends Component
{
    constructor(props) {
        super()
        this.state = {
            layouts: [],
            pl: "linux249",
            a: 126,
            w: 373
        }
    }
    componentWillMount() {
        //get layouts from api
        const { pl, w, a } = this.props
        fetch(`https://cnc-eco.herokuapp.com/api/v1/layouts?pl=${pl}&w=${w}&a=${a}`)
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
            <input value={this.state.pl}/>
            <input value={this.state.w} />
            <input value={this.state.a}/>
                <Title>{layouts.length}</Title>
                {layouts.map((layout, i) => <Layout key={i} layout={layout}/>)}


            </Body>
        )
    }
}

function mapStateToProps(state) {
    return {
        pl: state.player.pl,
        w: state.player.w,
        a: state.player.a
    }
}

export default connect(mapStateToProps)(BaseHeader)
