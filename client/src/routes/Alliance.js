import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
import LayoutS from '../style/Layouts';
import Row from '../style/Row';
import styled from 'styled-components';
import { shortenNumber } from '../util/service';
import { api_url } from '../config';
import Button from '../style/Button';
import icon_credits from '../img/icon/icon_credits.png';
import { changeLoading } from '../store/actions/player';
// TODO time since last seen a layout shod be placed to the backend
// TODO IDEA autmaticly remove layouts after X days (cronjobs)

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    grid-template-rows: repeat(50, 1fr);
`;

const Cell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.img`
    width: 1.4rem;
    height: 1.4rem;
    margin: 0.2rem;
`;

class Alliance extends Component {
    constructor(props) {
        super();
        this.state = {
            members: [],
            name: '',
            count: 0,
            lastUpdate: null,
        };
    }
    componentWillMount() {
        //get layouts from api
        this.props.isAuthenticated && this.getAlliance();
    }

    getAlliance = async () => {
        this.props.changeLoading(true);
        const { w, allianceId, token } = this.props;
        const url = `${api_url}/alliance?world=${w}&alliance=${allianceId}`;
        const alliance = await fetch(url, {
            headers: {
                Authorization: 'Bearer  ' + token,
            },
        }).then(res => res.json());
        console.log({ alliance });
        this.setState({
            name: alliance.name,
            count: alliance.count,
            lastUpdated: alliance.date,
            members: alliance.members,
        });
        this.props.changeLoading(false);
    };

    render() {
        const { members, name, count, lastUpdate } = this.state;
        const {} = this.props;
        return (
            <Body>
                <LayoutS>
                    <Row>{name + ' (' + count + ')'}</Row>
                    <Button onClick={this.getAlliance}>get</Button>
                    <Grid>
                        <Cell>Name</Cell>
                        <Cell>Rang</Cell>
                        <Cell>Rolle</Cell>
                        <Cell>Punkte</Cell>
                        <Cell>R Punkte?</Cell>
                        <Cell>Basen</Cell>
                        <Cell>PVE Kills</Cell>
                        <Cell>PVP Kills</Cell>
                        <Cell>Code</Cell>
                        <Cell>
                            <Icon src={icon_credits}>{}</Icon>
                        </Cell>
                        <Cell>Max CP</Cell>
                        <Cell>Funds</Cell>
                        <Cell>Schirme</Cell>
                        <Cell>Time</Cell>
                        {members.map(member => {
                            return (
                                member.data && (
                                    <Fragment key={member.name}>
                                        <Cell>{member.name}</Cell>
                                        <Cell>{member.rank}</Cell>
                                        <Cell>{member.role}</Cell>
                                        <Cell>{shortenNumber(member.points)}</Cell>
                                        <Cell>{shortenNumber(member.rPoints)}</Cell>

                                        <Cell>{member.basecount}</Cell>
                                        <Cell>{member.pvekills}</Cell>
                                        <Cell>{member.pvpkills}</Cell>
                                        <Cell>{member.hascode}</Cell>
                                        <Cell>{shortenNumber(member.creditsCount)}</Cell>

                                        <Cell>{member.maxcp}</Cell>
                                        <Cell>{member.funds}</Cell>
                                        <Cell>{member.schirme}</Cell>
                                        <Cell>{new Date(member.timeToMcv).toDateString()}</Cell>
                                    </Fragment>
                                )
                            );
                        })}
                    </Grid>
                </LayoutS>
            </Body>
        );
    }
}

function mapStateToProps(state) {
    return {
        w: state.player.w,
        allianceId: state.player.allianceId,
        worlds: state.player.worlds,
        auth: state.auth.isAuthenticated,
        token: state.auth.token,
    };
}

const mapDispatchToProps = { changeLoading };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Alliance);
