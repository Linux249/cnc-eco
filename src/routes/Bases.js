import React, { Component } from 'react'
import { connect } from 'react-redux';
import { replaceBaseFromUrl } from '../store/actions/base'
import Base from '../components/Base.js'
import BuildingMenu from '../containers/Buildings'
import Menu from '../components/Menu'
import Body from '../style/Body'
import Row from '../style/Row'
import Button from '../style/Button'
import styled from 'styled-components'

const BaseS = styled.div``
const MenuS = styled.div``

class Bases extends Component {
    constructor() {
        super()
        this.state = {
            player: "linux249",
            worlds: [],
            bases: []
        }
    }

    async componentWillMount() {
        const { worlds } = await fetch(" https://cnc-eco.herokuapp.com/api/v1/player?name=linux249").then(res => res.json())
        this.setState({worlds, bases: worlds[0].bases})
        this.props.replaceBaseFromUrl(worlds[0].bases[0].layout)
    }

    changeWorld = (i) => {
        this.setState(prevState => ({bases: prevState.worlds[i].bases}))
    }


    render() {
        const { worlds, bases } = this.state
        const { replaceBaseFromUrl } = this.props

        return (
            <BaseS>
                <Row>
                    {worlds.map((world, i) =>
                        <Button
                            key={i}
                            onClick={() => this.changeWorld(i)}
                        >
                            {world.name}
                        </Button>
                    )}
                </Row>
                <Row>
                    {bases.map((base, i) =>
                        <Button
                            key={i}
                            onClick={() => replaceBaseFromUrl(base.layout)}
                        >
                            {base.name}
                        </Button>
                    )}
                </Row>
                <Body>
                <BuildingMenu />
                <Base />
                <Menu/>
                </Body>
            </BaseS>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        replaceBaseFromUrl: (url) => dispatch(replaceBaseFromUrl(url))
    }
}

export default connect(null, mapDispatchToProps)(Bases);
