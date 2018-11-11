import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
import LayoutS from '../style/Layouts';
import Row from '../style/Row';
import Loading from '../components/Loading';

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
    return {};
};

export default connect()(Alliance);
