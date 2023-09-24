import Button from '@/style/Button';
import Column from '@/style/Column';
import Container from '@/style/Container';
import LoadingPoints from '@/style/LoadingPoints';
import Title from '@/style/Title';
import useSWR from 'swr';
import { InfoText } from '@/style/InfoText';
import React from 'react';
import { useSession, signOut } from 'next-auth/client';
import Link from 'next/link';
import useWorlds from '../../hooks/worlds';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function UpdateWorlds() {
    const [worlds, loadingWorlds, error] = useWorlds();
    console.log(worlds);
    const [session, loading] = useSession();
    const user = session && session.user;

    async function updateWorlds() {
        console.log('f: updateAllWorlds');
        const data = await fetch('/api/user/worlds', { method: 'PUT' }).then((r) => r.json());
        console.log({ data });
    }

    if (!user) return <div className="error">Not logged in</div>;
    if (!user.name) return <div className="error">No Player name added, REDIRECT MA_YbE</div>;
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

export const User = () => {
    const { data, error } = useSWR('/api/user?name=linux249&email=jl@nuuk.de', fetcher);
    const [session, loading] = useSession();

    // todo add loading

    // https://www.cnc-eco.de/user?token=ikpoei5w2tatcqguk4nk6l5o9o9ew54ygaapk2fwp41b
    const name = session?.user.name;

    if (loading) return <div>loading</div>;
    return (
        <div>
            <h1>{name}</h1>
            <div>logged in? {session?.user ? JSON.stringify(session) : 'no'}</div>
            {!name && (
                <>
                    <InfoText>
                        <Link href="/scripts">
                            <>
                                <b>cnc-eco script</b>
                            </>
                        </Link>
                        &#160; must be installed first
                    </InfoText>
                    <InfoText>
                        Click ingame 'get token' in the menu to add your data to your account
                    </InfoText>
                </>
            )}
            <div>
                <button onClick={signOut}>Sign out</button>
            </div>

            {session?.user && <UpdateWorlds name={session.user} />}
        </div>
    );
};

export default User;
