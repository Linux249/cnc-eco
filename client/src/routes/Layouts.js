import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
import Title from '../style/AppName';
import Button from '../style/Button';
import Layout from '../components/Layout';
import { api_url } from '../config';
import { changeLoading } from '../store/actions/player';
import { Column } from '../style/Column';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// TODO time since last seen a layout shod be placed to the backend
// TODO IDEA autmaticly remove layouts after X days (cronjobs)
const LayoutS = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    //align-items: center;
    //padding: 2px;
`;
function Layouts(props) {
    const [layouts, changeLayouts] = useState([]);

    useEffect(() => {
        console.error('EFFEKT');
        getLayouts();
    }, [props.w]);

    function getLayouts() {
        props.changeLoading(true);
        const { pl, w, allianceId, token } = props;
        // todo limit 50 first and than load other
        const url = `${api_url}/layouts?pl=${pl}&w=${w}&a=${allianceId}&limit=200&skip=0`;
        fetch(url, {
            headers: {
                Authorization: 'Bearer  ' + token,
            },
        })
            .then(res => res.json())
            .then(layouts => {
                console.log(layouts);
                // maybe this is bedder for ux
                changeLayouts(layouts);
                props.changeLoading(false);
            });
    }

    return props.world !== props.w ? (
        <Redirect to={'/layouts/' + props.w} />
    ) : (
        <Body>
            <div />
            <div>
                <LayoutS>
                    {layouts.map((layout, i) => (
                        <Layout key={i} layout={layout} />
                    ))}
                </LayoutS>
            </div>
            <Column>
                <Button onClick={getLayouts}>Update</Button>
                <Title>{'Loaded:' + layouts.length}</Title>
            </Column>
        </Body>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        pl: state.player.name,
        w: state.player.w,
        world: ownProps.match.params.world,
        allianceId: state.player.allianceId,
        worlds: state.player.worlds,
        token: state.auth.token,
    };
}

const mapDispatchToProps = { changeLoading };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layouts);
