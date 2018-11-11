import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
// import Area from '../style/Area'
import Title from '../style/Title';
import LayoutS from '../style/Layouts';
import { changeAlliance, changeWorld, changePlayer } from '../store/actions/player';
import Button from '../style/Button';
import Row from '../style/Row';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { api_url } from '../config/config';

// TODO time since last seen a layout shod be placed to the backend
// TODO IDEA autmaticly remove layouts after X days (cronjobs)

class Alliance extends Component {
    constructor(props) {
        super();
        this.state = {
            members: [...Array(50)],
            loading: false,
        };
    }
    componentWillMount() {
        //get layouts from api
        // this.getAlliance();
    }

    getAlliance = () => {
        this.setState({ loading: true });
        const {} = this.props;
        //const alliance = await fetch(`${api_url}/layouts?pl=${pl}&w=${w}&a=${a}&limit=200`).then(res => res.json())
        this.setState({ loading: false });
    };

    render() {
        const { loading, members } = this.state;
        const {} = this.props;
        return (
            <Body>
                <LayoutS>
                    <Loading isLoading={loading} />
                    {!loading && (
                        <Fragment>
                            <Row>Alliance</Row>
                            {members.map(member => (
                                <Body>
                                    <div>Name</div>
                                    <div>Rang</div>
                                    <div>Punkte</div>
                                    <div>Basen</div>
                                    <div />
                                    <div />
                                </Body>
                            ))}
                        </Fragment>
                    )}
                </LayoutS>
            </Body>
        );
    }
}

function mapStateToProps(state) {
    return {
        pl: state.player.pl,
        w: state.player.w,
        a: state.player.a,
        worlds: state.player.worlds,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changePlayer: w => dispatch(changePlayer(w)),
        changeWorld: w => dispatch(changeWorld(w)),
        changeAlliance: a => dispatch(changeAlliance(a)),
    };
};

export default connect()(Alliance);
