import Button from '@/style/Button';
import Column from '@/style/Column';
import Container from '@/style/Container';
import LoadingPoints from '@/style/LoadingPoints';
import Title from '@/style/Title';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import useWorlds from '../../hooks/worlds';
import { PLAYER_NAME_EXIST } from '../../util/messages';


const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Player() {
    const [worlds, loadingWorlds, error] = useWorlds();

    console.log(worlds);
    const [session, loading] = useSession();
    const user = session && session.user;

    async function updateWorlds() {
        console.log('f: updateAllWorlds');
        const data = await fetch('/api/user/worlds', { method: 'PUT' }).then((r) => r.json());
        console.log({ data });
    }

    if (!user) return <div className='error'>Not logged in</div>;
    if (!user.name) return <div className='error'>No Player name added, REDIRECT MA_YbE</div>;
    return (
        <div>
            <h1>update/sort worlds</h1>
            <p>{user?.name}</p>
            <Column>
                <Container>
                    <Title>Worlds</Title>
                    <LoadingPoints loading={loading} />
                    {worlds?.length !== 0 &&
                    worlds?.map((w) => (
                        <Button
                            key={w.id}
                            // onClick={() => props.changeWorld(w)}
                            // active={worldId === w.worldId}
                        >
                            {w.name}
                        </Button>
                    ))}
                    <br />
                    {/*{success && <Info>{success}</Info>}*/}
                    <Button onClick={updateWorlds}>Update worlds</Button>
                </Container>
            </Column>
        </div>
    );
}

function PlayerName() {
    // const { data, error } = useSWR('/api/user?name=linux249&email=jl@nuuk.de', fetcher);
    const [session, loading] = useSession();
    const router = useRouter();
    const name = router.query.name;
    const user = session?.user;

    const { data, error } = useSWR('/api/user/worlds', fetcher);
    console.log({ data, error });
    // todo redirict to login page, with a return url
    useEffect(() => {
        console.log('user mount', user);
        console.log(router);
        // redirect if not logged in but everything else is ok
        if (!loading && !session) router.push(`/login?returnUrl=/user/player?name=${name}`);
        // redirect if user already added a player name
        if (!loading && user?.name) router.push(`/user?info=${PLAYER_NAME_EXIST}`);
    }, [session]);

    // https://www.cnc-eco.de/user/name?token=ikpoei5w2tatcqguk4nk6l5o9o9ew54ygaapk2fwp41b
    // todo if token exist add username to account and redirect to /user

    // https://www.cnc-eco.de/user/player?name=linux249

    // todo request all worlds for this user name

    // let user pick a world and click "send message"

    // wait for positive response and tell him to use link

    if (!name) return <div className='message--error'>

        <h1>How to add a player name</h1>

        <h4>Before</h4>
        <p>install the scriot</p>

        <h4>first</h4>
        <p>update your game data</p>

        <h4>than</h4>
        <p>click the "add player" button</p>

        <p>Ater that you will be redirected here again and can select a world where you can
            choose to get a secret link to your ingame post Tfach</p>
    </div>;
    if (loading) return <div>waiting for user session</div>;

    return (
        <div>
            <h1>Add a player name to your account</h1>
            <p>please select a world where you want to receive your login message </p>
            <p>
                If no world appears after finishing loading please update your game data ingame with
                the cnc-eco script.
            </p>

            <h2>Worlds</h2>

            <button>Send Message</button>
        </div>
    );
}

export default Player;
