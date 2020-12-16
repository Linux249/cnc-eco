/*
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Base from '../components/Base.js';
import BasesMenuRight from '../components/BasesMenuRight';
import BuildingMenu from '../containers/BuildingMenu';
import BasesMenu from '@/components/BasesMenu';
import Body from '../style/Body';
import Column from '../style/Column';
import Defense from '../components/Defense';
import Army from '../components/Army';
import { api_url } from '../config';
import { changeLoading, updateBases } from '../store/actions/player';

export const Bases =  (props) => {
    const {worldId, token, _id} = props

    useEffect(() => {
        async function loadPlayer() {
            props.changeLoading(true);

            // todo requqest player data
            const url = api_url + '/player?player=' + _id + '&world=' + worldId;
            const player = await fetch(url, {
                headers: new Headers({
                    Authorization: 'Bearer  ' + token,
                }),
            }).then(res => res.json());
            console.log({ player });
            player.bases && props.updateBases(player.bases);
            // player.allianceId && props.updateAllianceId(player.allianceId);
            props.changeLoading(false);
        }
        _id && loadPlayer()
    }, [_id])

    return (
        <Column center>
            <BasesMenu />
            <Body large>
                <BuildingMenu area="buildings" />
                <Base />
                <BasesMenuRight />
                <BuildingMenu area="defense" />
                <Defense />
                <div />
                <BuildingMenu area="army" />
                <Army />
                <div />
                <div />
                {/!*<BestBuildingsToUpgrade />*!/}
            </Body>
        </Column>
    );
}

const mapStateToProps = state => ({
    _id: state.player._id,
    token: state.auth.token,
    worldId: state.player.w,
});

const mapDispatchToProps = {
    updateBases,
    changeLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bases)
*/
