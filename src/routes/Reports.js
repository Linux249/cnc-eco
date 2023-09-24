import React, { useEffect, useState } from 'react';
import Body from '@/style/Body';
import { connect } from 'react-redux';
import { api_url } from '../config';
import Area from '../style/Area';
import Column from '@/style/Column';
import Title from '../style/Title';

export function Reports({ token, playerId, world }) {
    console.log({ token });
    const [reports, setReports] = useState([]);
    const [layouts, setLayouts] = useState([]);
    const [players, setPlayers] = useState([]);

    // Add event listeners
    useEffect(() => {
        async function getStats() {
            console.log('load reports');
            const data = await fetch(api_url + '/reports/off/' + world + '/' + playerId, {
                headers: {
                    // 'Content-Type': 'application/json; charset=utf-8',
                    Authorization: 'Bearer  ' + token,
                },
            }).then(res => res.json());

            console.log({ data });
        }
        token && getStats();
    }, [token]); // Empty array ensures that effect is only run on mount and unmount

    return (
        <Body>
            <div />
            <div></div>
            <Column>
                <Area>
                    <Title>Layouts</Title>
                    {/*<Trend smooth radius={20} stroke="#3d1466" data={layouts} />*/}
                </Area>
                <Area>
                    <Title>Players</Title>
                    {/*<Trend smooth radius={20} stroke="#3d1466" data={players} />*/}
                </Area>
            </Column>
        </Body>
    );
}

const mapStateToProps = state => ({
    playerId: state.player.playerId,
    world: state.player.w,
    token: state.auth.token,
});

export default connect(mapStateToProps)(Reports);
