import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { changeLoading } from '../store/actions/player';
import { api_url } from '../config';
import { shortenNumber } from '../util/service';
import tib from '../img/icon/tib_small.png';
import cris from '../img/icon/cris_small.png';
import power from '../img/icon/power_small.png';
import credits from '../img/icon/credits_small.png';
import researchPoints from '../img/icon/research_points.png';
import supplyPoints from '../img/icon/supply_points.png';
import funds from '../img/icon/funds.png';
import commandoPoints from '../img/icon/commando_points.png';
import offenseRepair from '../img/icon/offense_repair.png';
import Body from '../style/Body';
import Row from '../style/Row';
import Button from '../style/Button';
import styled from 'styled-components';

// TODO show last update in table

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(25, 1fr);
    grid-template-rows: repeat(50, 1fr);
`;

const AllianceS = styled.div``;

const Cell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border: 0.001rem solid rgba(74, 88, 128, 0.47);
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
            members: alliance.members.sort((m1, m2) =>
                !m1.rank || !m2.rank ? -1 : m1.rank < m2.rank ? 1 : -1,
            ),
        });
        this.props.changeLoading(false);
    };

    render() {
        const { members, name, count, lastUpdate } = this.state;
        const {} = this.props;
        return (
            <Body>
            <AllianceS>
                    <Row>{name + ' (' + count + ')'}</Row>
                    <Button onClick={this.getAlliance}>get</Button>
                    <Grid>
                        <Cell>Name</Cell>
                        <Cell>Ranking</Cell>
                        <Cell>Rolle</Cell>
                        <Cell>Score</Cell>
                        <Cell>
                            <Icon src={researchPoints} alt="Research"/>
                        </Cell>
                        <Cell>Bases</Cell>
                        <Cell>PVE Kills</Cell>
                        <Cell>PVP Kills</Cell>
                        <Cell>Code</Cell>
                        <Cell>
                            <Icon src={credits} alt="Credits"/>
                        </Cell>
                        <Cell>
                            <Icon src={commandoPoints} alt="CP"/>
                        </Cell>
                        <Cell>
                            <Icon src={funds} alt="Funds"/>
                        </Cell>
                        <Cell>
                            <Icon src={supplyPoints} alt="Supply"/>
                        </Cell>
                        <Cell>Time</Cell>

                        <Cell>
                            <Icon src={''} alt="max Off"/>
                        </Cell>
                        <Cell>
                            <Icon src={''} alt="max Def"/>
                        </Cell>
                        <Cell>
                            <Icon src={offenseRepair} alt="Repair"/>
                        </Cell>

                        <Cell>
                            {' '}
                            <Icon src={tib} alt="Tib"/>/h
                        </Cell>
                        <Cell>
                            <Icon src={cris} alt="Cris"/>/h
                        </Cell>
                        <Cell>
                            <Icon src={power} alt="Power"/>/h
                        </Cell>
                        <Cell>
                            <Icon src={credits} alt="Credits"/>/h
                        </Cell>

                        <Cell>
                            <Icon src={''} alt="avg Def"/>
                        </Cell>
                        <Cell>
                            <Icon src={''} alt="avg Sub"/>
                        </Cell>
                        <Cell>
                            <Icon src={''} alt="avg Df"/>
                        </Cell>
                        <Cell>
                            <Icon src={''} alt="avg Df HQ"/>
                        </Cell>

                        {members.map(member => {
                            return member.data ? (
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

                                    <Cell>{member.actcp + '/' + member.maxcp}</Cell>
                                    <Cell>{member.funds}</Cell>
                                    <Cell>{member.schirme}</Cell>
                                    <Cell>{Math.round(member.timeToMcv / (3600 * 24))}</Cell>

                                    <Cell>{member.offbase.off}</Cell>
                                    <Cell>{member.offbase.def}</Cell>
                                    <Cell>{member.offbase.rep + '/' + member.offbase.maxRep}</Cell>

                                    <Cell>{shortenNumber(member.totalTib)}</Cell>
                                    <Cell>{shortenNumber(member.totalPower)}</Cell>
                                    <Cell>{shortenNumber(member.totalCris)}</Cell>
                                    <Cell>{shortenNumber(member.totalCredits)}</Cell>

                                    <Cell>{member.avargDef}</Cell>
                                    <Cell>{member.avargSubLvl}</Cell>
                                    <Cell>{member.avargDfLvl}</Cell>
                                    <Cell>{member.avargDfHQLvl}</Cell>
                                </Fragment>
                            ) : (
                                <Fragment key={member.name}>
                                    <Cell>{member.name}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{member.role}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>

                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>

                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>

                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>

                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>

                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                    <Cell>{}</Cell>
                                </Fragment>
                            );
                        })}
                    </Grid>
            </AllianceS>
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
