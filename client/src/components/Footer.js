import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { api_url } from '../config';
import Area from '../style/Area';

const FooterStyle = styled(Area)`
    display: flex;
    justify-content: space-around;
    width: calc(100% - 16px);
    margin: 0;
    
    font-weight: 800;
    font-size: 10px;
    color: #000000d4;
`;

export function Footer({ token }) {
    const [worlds, setWorlds] = useState(0);
    const [users, setUsers] = useState(0);
    const [layouts, setLayouts] = useState(0);
    const [players, setPlayers] = useState(0);
    const [size, setSize] = useState(0);

    // Add event listeners
    useEffect(() => {
        async function getStats() {
            console.log('load footer stats');
            const data = await fetch(api_url + '/db/getFooterStats', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: 'Bearer  ' + token,
                },
            }).then(res => res.json());
            setUsers(data.users)
            setWorlds(data.worlds)
            let countSize = 0
            let countLayouts = 0
            let countPlayers = 0
            for(let i = 0; i < data.report.layouts.length; i += 1) {
                countSize += data.report.layouts[i].size
                countLayouts += data.report.layouts[i].count
            }
            for(let i = 0; i < data.report.players.length; i += 1) {
                countSize += data.report.players[i].size
                countPlayers += data.report.players[i].count
            }
            setLayouts(countLayouts)
            setPlayers(countPlayers)
            setSize(countSize)
        }
        token && getStats();
    }, [token]); // Empty array ensures that effect is only run on mount and unmount

    return (
        <FooterStyle>
            <div>Worlds: {worlds}</div>
            <div>Registered: {users}</div>
            <div>Player: {players}</div>
            <div>Layouts: {layouts}</div>
            <div>Size: {size}</div>
        </FooterStyle>
    );
}

const mapStateToProps = state => ({ token: state.auth.token });

export default connect(mapStateToProps)(Footer);
