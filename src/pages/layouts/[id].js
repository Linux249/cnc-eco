import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { mutate } from 'swr';
import useLayouts from '../../hooks/layouts';
import Layout from '@/components/Layout';
import BodyRaw from '@/style/Body';
import Button from '@/style/Button';
import { Column } from '@/style/Column';
import Row from '@/style/Row';
import Container from '@/style/Container';
import Info from '@/style/Info';
import Title from '@/style/Title';
import Alert from '@/style/Alert';

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
    const router = useRouter();
    const { id } = router.query;
    /** list of layouts loaded from API*/
    /** sort: tib, kris, cris, time - set carefully while be used on DB query*/
    const [sort, setSort] = useState('tib');
    /** like limit, skip*/
    const [limit, setLimit] = useState(200);
    /** How many are loaded? response to user/from API*/

    const [layouts, loading, error] = useLayouts(id, limit, sort);
    console.log('/Layouts', id, layouts, props);

    if (loading) return <h1>Loading</h1>;

    /** update layouts on load ond if player change world*/
    // useEffect(() => {
    //     console.log('USE EFFECT', +w, +worldInUrl);
    //     // only load if there is no world param in route
    //     if (worldInUrl && +worldInUrl !== +w) {
    //         const newWorld = props.worlds.find(world => +world.worldId === +worldInUrl);
    //         console.log({ newWorld });
    //         if (newWorld) {
    //             props.changeWorld(newWorld);
    //         } else {
    //             // todo error
    //             setError(
    //                 `This world (id: ${worldInUrl}) is not connected to your account. Please go to your profile and update worlds`
    //             );
    //         }
    //     } else {
    //         updateLayouts();
    //     }
    // }, [w, worldInUrl]);

    function updateLayouts() {
        mutate
    }

    function changeSort(t) {
        console.log('changeSort');
        setSort(t);
    }

    return (
        <Body>
            <LayoutS>
                {layouts.map((layout, i) => (
                    <Layout key={i} layout={layout} />
                ))}
            </LayoutS>
            <Column>
                {error && <Alert>{error}</Alert>}
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
                        <Button onClick={updateLayouts}>Update</Button>
                    </Row>
                    {/*{message.length && <Info>{message}</Info>}*/}
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
}

export default Layouts;
