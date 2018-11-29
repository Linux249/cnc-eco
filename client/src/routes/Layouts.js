import React, { Component } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
import Title from '../style/Title';
import LayoutS from '../style/Layouts';
import Button from '../style/Button';
import Row from '../style/Row';
import Layout from '../components/Layout';
import { api_url } from '../config';
import WorldBaseMenu from '../containers/WorldBaseMenu';
import { changeLoading } from '../store/actions/player';

// TODO time since last seen a layout shod be placed to the backend
// TODO IDEA autmaticly remove layouts after X days (cronjobs)

class Layouts extends Component {
    constructor(props) {
        super();
        this.state = {
            layouts: [],
            loading: false,
        };
    }
    componentWillMount() {
        //get layouts from api
        this.getLayouts();
    }

    getLayouts = () => {
        this.props.changeLoading(true);
        const { pl, w, allianceId, token } = this.props;
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
        const { layouts, loading } = this.state;
        return (
            <Body>
            <div>
                <Row>
                    <WorldBaseMenu/>
                    <Button onClick={() => this.getLayouts()}>Update</Button>
                    <Title>{layouts.length}</Title>
                </Row>
                <LayoutS>
                    {layouts.map((layout, i) => (
                        <Layout key={i} layout={layout}/>
                    ))}
                </LayoutS>
            </div>
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
