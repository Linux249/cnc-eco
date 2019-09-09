import React, { useEffect, useState } from 'react';
import Trend from 'react-trend';
import Body from '../style/Body';
import { connect } from 'react-redux';
import { api_url } from '../config';
import Area from '../style/Area';
import Column from '../style/Column';
import Title from '../style/Title';

export function Footer({ token }) {
    const [reports, setReports] = useState([]);
    const [layouts, setLayouts] = useState([]);
    const [players, setPlayers] = useState([]);

    // Add event listeners
    useEffect(() => {
        async function getStats() {
            console.log('load footer stats');
            const data = await fetch(api_url + '/db/reports', {
                headers: {
                    // 'Content-Type': 'application/json; charset=utf-8',
                    Authorization: 'Bearer  ' + token,
                },
            }).then(res => res.json());

            const layoutsData = [];
            const playersData = [];
            data.forEach(report => {
                layoutsData.push(
                    report.layouts.reduce((a, r) => (r.count ? (a += r.count) : a), 0)
                );
                playersData.push(
                    report.players.reduce((a, r) => (r.count ? (a += r.count) : a), 0)
                );
            });
            console.log(layoutsData);
            console.log(playersData);

            setLayouts(layoutsData);
            setPlayers(playersData);
        }
        token && getStats();
    }, [token]); // Empty array ensures that effect is only run on mount and unmount

    return (
        <Body>
            <div />
            <Column>
                <Area>
                    <Title>Layouts</Title>
                    <Trend smooth radius={20} stroke="#3d1466" data={layouts} />
                </Area>
                <Area>
                    <Title>Players</Title>
                    <Trend smooth radius={20} stroke="#3d1466" data={players} />
                </Area>
            </Column>
            <div />
        </Body>
    );
}

const mapStateToProps = state => ({ token: state.auth.token });

export default connect(mapStateToProps)(Footer);
