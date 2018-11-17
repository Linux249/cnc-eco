import React, { Component } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
import Title from '../style/Title';
import LayoutS from '../style/Layouts';
import Button from '../style/Button';
import Row from '../style/Row';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { api_url } from '../config';

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
        this.setState({ loading: true });
        const { pl, w, a, token } = this.props;
        const url = `${api_url}/layouts?pl=${pl}&w=${w}&a=${a}&limit=200`;
        fetch(url, {
            headers: {
                Authorization: 'Bearer  ' + token,
            },
        })
            .then(res => res.json())
            .then(layouts => {
                console.log(layouts);
                // maybe this is bedder for ux
                this.setState({ layouts }, this.setState({ loading: false }));
            });
    };

    render() {
        const { layouts, loading } = this.state;
        const { w, a, pl } = this.props;
        return (
            <Body>
                <Loading isLoading={loading} />
                {!loading && (
                    <div>
                        <Row>
                            <input disabled value={pl} />
                            <input disabled value={w} />
                            <input disabled value={a} />
                            <Button onClick={() => this.getLayouts()}>Update</Button>
                            <Title>{layouts.length}</Title>
                        </Row>
                        <LayoutS>
                            {layouts.map((layout, i) => (
                                <Layout key={i} layout={layout} />
                            ))}
                        </LayoutS>
                    </div>
                )}
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
        token: state.auth.token,
    };
}

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps)(Layouts);
