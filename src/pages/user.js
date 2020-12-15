import useSWR from 'swr';
import { InfoText } from '@/style/InfoText';
import React from 'react';
import { useSession, signOut } from 'next-auth/client';
import Link from 'next/link';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function UpdateWorlds({ user }) {
    async function updatePlayer() {
        console.log('/api/user')

    }
    return (
        <div>
            <h1>update/sort worlds</h1>
            <p>{user?.name}</p>
            <button onClick={updatePlayer}>Sign out</button>
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
                            <a>
                                <b>cnc-eco script</b>
                            </a>
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

            {session?.user && <UpdateWorlds name={session?.user} />}
        </div>
    );
};

export default User;
