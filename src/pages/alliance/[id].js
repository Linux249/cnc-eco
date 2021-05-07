import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import useAlliance from '../../hooks/alliance';
import { shortenNumber } from '../../util/service';
import tib from '../../img/icon/tib_small.png';
import cris from '../../img/icon/cris_small.png';
import power from '../../img/icon/power_small.png';
import credits from '../../img/icon/credits_small.png';
import researchPoints from '../../img/icon/research_points.png';
import supplyPoints from '../../img/icon/supply_points.png';
import funds from '../../img/icon/funds.png';
import commandoPoints from '../../img/icon/commando_points.png';
import offenseRepair from '../../img/icon/offense_repair.png';
import BodyRaw from '@/style/Body';
import Row from '@/style/Row';
import Button from '@/style/Button';
import styled from 'styled-components';
import { msToTime } from '../../util/secToTime';
import Column from '@/style/Column';
import { baseLight, border, borderRadius } from '@/style/constants';
import Container from '@/style/Container';
import Title from '@/style/Title';
import { mutate } from 'swr';
// TODO show last update in table

const Grid = styled.div`
    //height: available;
    max-height: 100vh;
    display: grid;
    grid-template-columns: repeat(26, 1fr);
    grid-template-rows: repeat(50, 1fr);
`;

const AllianceS = styled.div`
    max-height: 90vh;
    overflow: auto;
    font-size: 0.7rem;

    padding: 5px;

    font-weight: 600;

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
    border: ${border};
    border-radius: ${borderRadius};
    border-color: ${baseLight};
    margin: 1px;

    ${(p) => (p.active ? 'background-color: ' + baseLight : '')};
`;

const Icon = styled.img`
    width: 1.4rem;
    height: 1.4rem;
    margin: 0.2rem;
`;

const Body = styled(BodyRaw)`
    grid-column-end: 2;
    grid-template-columns: minmax(100px, 90%) 1fr;
`;

function Alliance() {
    const router = useRouter();

    /** sort type, s cause the name sort is already the function name */
    const [s, setS] = useState('rank');
    const { id } = router.query;
    const [alliance] = useAlliance(id);

    const count = alliance?.count || 0
    const allianceName = alliance?.name ||''
    const members = alliance?.members.sort((a, b) => +b.rank || 0 - +a.rank || 0) || []
    console.log('r:alliance', id, alliance);

    function updateAlliance() {
        return mutate(`/api/alliance/${id}`);
    }

    function sort(s) {
        console.log('SORT');
        console.log(s);
        setS(s);
        console.log([...members.sort((a, b) => +b[s] || 0 - +a[s] || 0)])
    }

    return (
        <Body>
            <AllianceS>
                <Grid>
                    <Cell active={s === 'name'} onClick={() => sort('name')}>
                        Name
                    </Cell>
                    <Cell active={s === 'rank'} onClick={() => sort('rank')}>
                        Rank
                    </Cell>
                    <Cell>Roll</Cell>
                    <Cell active={s === 'points'} onClick={() => sort('points')}>
                        Score
                    </Cell>
                    <Cell active={s === 'rPoints'} onClick={() => sort('rPoints')}>
                        <Icon src={researchPoints} alt="Research" />
                    </Cell>
                    <Cell active={s === 'basecount'} onClick={() => sort('basecount')}>
                        Bases
                    </Cell>
                    <Cell active={s === 'pvekills'} onClick={() => sort('pvekills')}>
                        PVE
                    </Cell>
                    <Cell active={s === 'pvpkills'} onClick={() => sort('pvpkills')}>
                        PVP
                    </Cell>
                    <Cell>Code</Cell>
                    <Cell active={s === 'creditsCount'} onClick={() => sort('creditsCount')}>
                        <Icon src={credits} alt="Credits" />
                    </Cell>
                    <Cell active={s === 'actcp'} onClick={() => sort('actcp')}>
                        <Icon src={commandoPoints} alt="CP" />
                    </Cell>
                    <Cell active={s === 'funds'} onClick={() => sort('funds')}>
                        <Icon src={funds} alt="Funds" />
                    </Cell>
                    <Cell active={s === 'schirme'} onClick={() => sort('schirme')}>
                        <Icon src={supplyPoints} alt="Supply" />
                    </Cell>
                    <Cell active={s === 'timeToMcv'} onClick={() => sort('timeToMcv')}>
                        Time
                    </Cell>

                    <Cell>
                        <div>Off</div>
                    </Cell>
                    <Cell>
                        <div>Def</div>
                    </Cell>
                    <Cell>
                        <Icon src={offenseRepair} alt="Repair" />
                    </Cell>

                    <Cell active={s === 'totalTib'} onClick={() => sort('totalTib')}>
                        <Icon src={tib} alt="Tib" />
                        /h
                    </Cell>
                    <Cell active={s === 'totalPower'} onClick={() => sort('totalPower')}>
                        <Icon src={cris} alt="Cris" />
                        /h
                    </Cell>
                    <Cell active={s === 'totalCris'} onClick={() => sort('totalCris')}>
                        <Icon src={power} alt="Power" />
                        /h
                    </Cell>
                    <Cell active={s === 'totalCredits'} onClick={() => sort('totalCredits')}>
                        <Icon src={credits} alt="Credits" />
                        /h
                    </Cell>

                    <Cell active={s === 'avargDef'} onClick={() => sort('avargDef')}>
                        Def&#8709;
                    </Cell>
                    <Cell active={s === 'avargSubLvl'} onClick={() => sort('avargSubLvl')}>
                        Sub&#8709;
                    </Cell>
                    <Cell active={s === 'avargDfLvl'} onClick={() => sort('avargDfLvl')}>
                        Def Fa&#8709;
                    </Cell>
                    <Cell active={s === 'avargDfHQLvl'} onClick={() => sort('avargDfHQLvl')}>
                        Def HQ&#8709;
                    </Cell>
                    <Cell active={s === 'updated'} onClick={() => sort('updated')}>
                        time
                    </Cell>

                    {members.map((member) => {
                        // member = members[0]
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
                                <Cell>{member.hascode ? '+' : '-'}</Cell>
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

                                <Cell>
                                    {Math.round(
                                        (Math.floor(
                                            (new Date() - new Date(member._updated)) /
                                                1000 /
                                                60 /
                                                60
                                        ) *
                                            10) /
                                            24
                                    ) / 10}
                                </Cell>
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

                                <Cell>{}</Cell>
                            </Fragment>
                        );
                    })}
                </Grid>
            </AllianceS>
            <Column>
                <Container center>
                    <Title>{allianceName + ' (' + count + ')'}</Title>
                    <Row>
                        <Button onClick={updateAlliance}>update</Button>
                    </Row>
                </Container>
            </Column>
        </Body>
    );
}

export default Alliance;
