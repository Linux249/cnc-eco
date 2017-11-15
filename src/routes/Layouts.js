import React, { Component } from 'react'
import { connect } from 'react-redux';
import Body from '../style/Body'
// import Area from '../style/Area'
import Title from '../style/Title'
import LayoutS from '../style/Layouts'
import { changeAlliance, changeWorld, changePlayer } from '../actions/player'
import Button from '../style/Button'
import Row from '../style/Row'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import { api_url } from '../config/config'

// TODO time since last seen a layout shod be placed to the backend
// TODO IDEA autmaticly remove layouts after X days (cronjobs)

class Layouts extends Component
{
    constructor(props) {
        super()
        this.state = {
            layouts: [],
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
                layouts = layouts.filter((l => 14 >= (new Date() - new Date(l.time) )/60/60/24/1000))
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
                {!loading &&
                    <div>
                        <Row>
                        <input value={pl} onChange={(e) => changePlayer(e.target.value)}/>
                        <input value={w} onChange={(e) => changeWorld(e.target.value)}/>
                        <input value={a} onChange={(e) => changeAlliance(e.target.value)}/>
                        <Button onClick={() => this.getLayouts()}>Update</Button>
                        <Title>{layouts.length}</Title>
                    </Row>
                    <LayoutS>
                        {layouts.map((layout, i) => <Layout key={i} layout={layout}/>)}
                    </LayoutS>
                </div>}

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

export default connect(mapStateToProps, mapDispatchToProps)(Layouts)
