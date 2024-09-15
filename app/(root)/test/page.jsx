import { auth } from '@/auth';
import { UserSessionLogClient } from '@/components/UserSessionLogClient';
import React from 'react';

const page = async () => {

    const session = await auth()

    return (
        <div className='my-container'>
            {JSON.stringify(session?.user)?.split('","').map((value, idx) => <p key={idx} className='text-xl p-1'>{value}</p>)}
            <UserSessionLogClient session={session} />
        </div>
    );
};

export default page;