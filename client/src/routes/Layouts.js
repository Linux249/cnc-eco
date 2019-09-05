import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { changeLoading } from '../store/actions/player';
import BodyRaw from '../style/Body';
import Button from '../style/Button';
import { Column } from '../style/Column';
import Row from '../style/Row';
import Container from '../style/Container';
import Info from '../style/Info';
import Title from '../style/Title';
import { api_url } from '../config';

const LayoutS = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    justify-content: center;
`;

const Body = styled(BodyRaw)`
    grid-column-end: 2;
    grid-template-columns: minmax(100px, 90%) 1fr;
`;

function Layouts(props) {
    /** list of layouts loaded from API*/
    const [layouts, setLayouts] = useState([]);
    /** How many are loaded? response to user/from API*/
    const [message, setMessage] = useState('');
    /** sort: tib, kris, cris, time - set carefully while be used on DB query*/
    const [sort, setSort] = useState('tib');
    /** like limit, skip*/
    const [limit, setLimit] = useState(200);

    useEffect(() => {
        getLayouts();
    }, [props.world]);

    useEffect(() => {
        if(props.w !== props.world) setMessage('World change - please click update')
    }, [props.w]);

    function getLayouts() {
        props.changeLoading(true);
        setMessage('');
        const { pl, world, allianceId, token } = props;
        // todo limit 50 first and than load other
        const url = `${api_url}/layouts?pl=${pl}&w=${world}&a=${allianceId}&limit=${limit}&skip=0&sort=${sort}`;
        fetch(url, {
            headers: {
                Authorization: 'Bearer  ' + token,
            },
        })
            .then(res => res.json())
            .then(layouts => {
                console.log(layouts);
                // maybe this is bedder for ux
                setLayouts(layouts);
                setMessage('loaded ' + layouts.length + ' layouts');
                props.changeLoading(false);
            })
            .catch(e => setMessage(e.message));
    }

    function changeSort(t) {
        console.log('changeSort');
        setSort(t);
        setLayouts([
            ...layouts.sort((a, b) =>
                t === 'time' ? new Date(b[t]) - new Date(a[t]) : b[t] - a[t]
            ),
        ]);
    }

    // if user tipped in some bullshit redirect to world from store
    if (isNaN(props.world)) return <Redirect to={'/layouts/' + props.w} />;

    return (
        <Body>
            <LayoutS>
                {layouts.map((layout, i) => (
                    <Layout key={i} layout={layout} />
                ))}
            </LayoutS>
            <Column>
                <Container>
                    <Title>Sort layouts</Title>
                    <Row>
                        <Button active={sort === 'tib'} onClick={() => changeSort('tib')}>
                            Tib
                        </Button>
                        <Button active={sort === 'cris'} onClick={() => changeSort('cris')}>
                            Kris
                        </Button>
                        <Button active={sort === 'power'} onClick={() => changeSort('power')}>
                            Power
                        </Button>
                        <Button active={sort === 'time'} onClick={() => changeSort('time')}>
                            Time
                        </Button>
                    </Row>
                </Container>
                <Container>
                    <Title>{'Loaded: ' + layouts.length}</Title>
                    <Row>
                        <Button active={limit === 100} onClick={() => setLimit(100)}>
                            100
                        </Button>
                        <Button active={limit === 200} onClick={() => setLimit(200)}>
                            200
                        </Button>
                        <Button active={limit === 500} onClick={() => setLimit(500)}>
                            500
                        </Button>
                        <Button onClick={getLayouts}>Update</Button>
                    </Row>
                    {message.length && <Info>{message}</Info>}
                </Container>
                <Container>
                    <Title>Save Layout</Title>
                    <Row>
                        <Button>Coming soon...</Button>
                    </Row>
                </Container>
            </Column>
        </Body>
    );
    // );
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
