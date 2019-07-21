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
import { msToTime } from '../util/secToTime';
import Column from '../style/Column';

// TODO show last update in table

const Grid = styled.div`
    //height: available;
    max-height: 100vh;
    display: grid;
    grid-template-columns: repeat(25, 1fr);
    grid-template-rows: repeat(50, 1fr);
`;

const AllianceS = styled.div`
    max-height: 90vh;
    overflow: auto;
    font-size: 0.7rem;
    
    /*
    Custom scrollbar style
    */
    /* width */
    ::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
    }
     /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
     /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }
     /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
        width: 0.7rem;
        height: 0.7rem;
        // font-family: monospace;
`;

const Cell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.1rem 0.5rem;
    //border-color: rgba(37, 38, 39, 0.1);
    //border-style: solid;
    //border-width: 1px;
    box-shadow: 0 0 2px -1px rgb(150, 150, 150);
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
    componentDidMount() {
        //get layouts from api
        console.log('wewewewewe');
        console.log(this.props.auth);
        const { w, allianceId, token } = this.props;
        console.log(w, allianceId, token);
        if (this.props.auth && this.props.allianceId) this.getAlliance();
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
                !m1.rank || !m2.rank ? -1 : m1.rank < m2.rank ? 1 : -1
            ),
        });
        this.props.changeLoading(false);
    };

    render() {
        const { members, name, count, lastUpdate } = this.state;
        const {} = this.props;
        return (
            <Body>
                <div />
                <AllianceS>
                    <Grid>
                        <Cell>Name</Cell>
                        <Cell>Ranking</Cell>
                        <Cell>Rolle</Cell>
                        <Cell>Score</Cell>
                        <Cell>
                            <Icon src={researchPoints} alt="Research" />
                        </Cell>
                        <Cell>Bases</Cell>
                        <Cell>PVE</Cell>
                        <Cell>PVP</Cell>
                        <Cell>Code</Cell>
                        <Cell>
                            <Icon src={credits} alt="Credits" />
                        </Cell>
                        <Cell>
                            <Icon src={commandoPoints} alt="CP" />
                        </Cell>
                        <Cell>
                            <Icon src={funds} alt="Funds" />
                        </Cell>
                        <Cell>
                            <Icon src={supplyPoints} alt="Supply" />
                        </Cell>
                        <Cell>Time</Cell>

                        <Cell>
                            <div>Off</div>
                        </Cell>
                        <Cell>
                            <div>Def</div>
                        </Cell>
                        <Cell>
                            <Icon src={offenseRepair} alt="Repair" />
                        </Cell>

                        <Cell>
                            <Icon src={tib} alt="Tib" />
                            /h
                        </Cell>
                        <Cell>
                            <Icon src={cris} alt="Cris" />
                            /h
                        </Cell>
                        <Cell>
                            <Icon src={power} alt="Power" />
                            /h
                        </Cell>
                        <Cell>
                            <Icon src={credits} alt="Credits" />
                            /h
                        </Cell>

                        <Cell>Def&#8709;</Cell>
                        <Cell>Sub&#8709;</Cell>
                        <Cell>Def Fa&#8709;</Cell>
                        <Cell>Def HQ&#8709;</Cell>

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
                                    <Cell>
                                        {msToTime(member.offbase.rep) +
                                            '/' +
                                            msToTime(member.offbase.maxRep)}
                                    </Cell>

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
                <Column>
                    <Row center>
                        <Row>{name + ' (' + count + ')'}</Row>
                        <Button onClick={this.getAlliance}>update</Button>
                    </Row>
                </Column>
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
    mapDispatchToProps
)(Alliance);
