import React from 'react';
import crypto from "crypto"

const page = () => {

    const bytes = crypto.randomBytes(32).toString('hex')

    return (
        <div>
            <p className='w-full overflow-auto'>{bytes}</p>
        </div>
    );
};

export default page;