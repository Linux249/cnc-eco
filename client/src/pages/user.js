import useSWR from 'swr';
import { InfoText } from '../style/InfoText';
import React from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const User = () => {
    const { data, error } = useSWR('/api/user', fetcher);
    const [session, loading] = useSession();
    // todo add loading

    // https://www.cnc-eco.de/user?token=ikpoei5w2tatcqguk4nk6l5o9o9ew54ygaapk2fwp41b
    const name = session?.user.name;
    return (
        <div>
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
            }
        </div>
    );
};

export default User;
