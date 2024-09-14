import { auth } from '@/auth';
import React from 'react';

const page = async () => {

    const session = await auth()

    return (
        <div className='my-container'>
            {JSON.stringify(session?.user)?.split('","').map((value, idx) => <p key={idx} className='text-xl p-1'>{value}</p>)}
        </div>
    );
};

export default page;