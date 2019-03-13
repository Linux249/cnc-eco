import React, { Component } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
import Title from '../style/Title';
import Button from '../style/Button';
// import Row from '../style/Row';
import Layout from '../components/Layout';
import { api_url } from '../config';
import { changeLoading } from '../store/actions/player';
import { Column } from '../style/Column';
import styled from 'styled-components';

// TODO time since last seen a layout shod be placed to the backend
// TODO IDEA autmaticly remove layouts after X days (cronjobs)
const LayoutS = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    //align-items: center;
    //padding: 2px;
`;
class Layouts extends Component {
    constructor(props) {
        super();
        this.state = {
            layouts: [],
        };
    }

    componentWillMount() {
        //get layouts from api
        this.getLayouts();
    }

    getLayouts = () => {
        this.props.changeLoading(true);
        const { pl, w, allianceId, token } = this.props;
        // todo limit 50 first and than load other
        const url = `${api_url}/layouts?pl=${pl}&w=${w}&a=${allianceId}&limit=200&skip=0`;
        fetch(url, {
            headers: {
                Authorization: 'Bearer  ' + token,
            },
        })
            .then(res => res.json())
            .then(layouts => {
                console.log(layouts);
                // maybe this is bedder for ux
                this.setState({ layouts }, () => this.props.changeLoading(false));
            });
    };

    render() {
        const { layouts } = this.state;
        return (
            <Body>
                <div />
                <div>
                    <LayoutS>
                        {layouts.map((layout, i) => (
                            <Layout key={i} layout={layout} />
                        ))}
                    </LayoutS>
                </div>
                <Column>
                    <Button onClick={() => this.getLayouts()}>Update</Button>
                    <Title>{'Loaded:' + layouts.length}</Title>
                </Column>
            </Body>
        );
    }
}

function mapStateToProps(state) {
    return {
        pl: state.player.name,
        w: state.player.w,
        allianceId: state.player.allianceId,
        worlds: state.player.worlds,
        token: state.auth.token,
    };
}

const mapDispatchToProps = { changeLoading };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layouts);
