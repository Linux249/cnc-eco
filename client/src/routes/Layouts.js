import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Body from '../style/Body';
import Text from '../style/Text';
import Button from '../style/Button';
import Layout from '../components/Layout';
import { api_url } from '../config';
import { changeLoading } from '../store/actions/player';
import { Column } from '../style/Column';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Row from '../style/Row';
import Container from '../style/Container';
import Info from '../style/Info';

// TODO time since last seen a layout shod be placed to the backend
// TODO IDEA autmaticly remove layouts after X days (cronjobs)
const LayoutS = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    justify-content: center;
    //align-items: center;
    //padding: 2px;
`;
function Layouts(props) {
    const [layouts, setLayouts] = useState([]);
    const [message, setMessage] = useState('');
    const [sort, setSort] = useState('tib');
    const [limit, setLimit] = useState(200);

    useEffect(() => {
        getLayouts();
    }, [props.w]);

    function getLayouts() {
        props.changeLoading(true);
        setMessage('');
        const { pl, w, allianceId, token } = props;
        // todo limit 50 first and than load other
        const url = `${api_url}/layouts?pl=${pl}&w=${w}&a=${allianceId}&limit=${limit}&skip=0&sort=${sort}`;
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
                <Container>
                    <Text>Sort layouts</Text>
                    <Row>
                        <Button first active={sort === 'tib'} onClick={() => changeSort('tib')}>
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
                    <Text>{'Loaded: ' + layouts.length}</Text>
                    <Row>
                        <Button first active={limit === 100} onClick={() => setLimit(100)}>
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
                {message.length && <Info fix>{message}</Info>}
                </Container>
                <Container>
                    <Text>Save Layout</Text>
                    <Row>
                        <Button first>Coming soon...</Button>
                    </Row>
                </Container>
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
