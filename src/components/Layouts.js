import React, { Component } from 'react'
import { connect } from 'react-redux';
import Body from '../style/Body'
import Title from '../style/Title'
import { changeAlliance, changeWorld, changePlayer } from '../actions/player'
import Button from '../style/Button'
import Row from '../style/Row'
import Layout from './Layout'
import Loading from './Loading'
import { api_url } from '../config/config'

class BaseHeader extends Component
{
    constructor(props) {
        super()
        this.state = {
            layouts: [],
            pl: "linux249",
            a: 126,
            w: 373,
            loading: false
        }
    }
    componentWillMount() {
        //get layouts from api
        this.getLayouts()
    }

    getLayouts = () => {
        this.setState({loading: true})
        const { pl, w, a } = this.props
        fetch(`${api_url}/layouts?pl=${pl}&w=${w}&a=${a}`)
            .then(res => res.json())
            .then(layouts => {
                console.log(layouts)
                // sort layouts
                layouts = layouts.sort((a,b)=> b.tib - a.tib )
                this.setState({loading: false})
                this.setState({ layouts })
            })
    }

    render()
    {
        const { layouts, loading } = this.state
        const { changeAlliance, changeWorld, changePlayer, w, a, pl} = this.props
        return (
            <Body>
                <Loading isLoading={loading}/>
                <Row>
                    <input value={pl} onChange={(e) => changePlayer(e.target.value)}/>
                    <input value={w} onChange={(e) => changeWorld(e.target.value)}/>
                    <input value={a} onChange={(e) => changeAlliance(e.target.value)}/>
                    <Button onClick={() => this.getLayouts()}>Update</Button>
                </Row>
                <Row>
                    <Title>{layouts.length}</Title>
                    {layouts.map((layout, i) => <Layout key={i} layout={layout}/>)}
                </Row>

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

const mapDispatchToProps = (dispatch) => {
    return {
        changePlayer: (w) => dispatch(changePlayer(w)),
        changeWorld: (w) => dispatch(changeWorld(w)),
        changeAlliance: (a) => dispatch(changeAlliance(a)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseHeader)
