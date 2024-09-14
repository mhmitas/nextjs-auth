import { auth } from '@/auth';
import Hero from '@/components/Hero';
import React from 'react';

const page = async () => {
    const session = await auth()
    console.log({ session });

    return (
        <main>
            <Hero />
        </main>
    );
};

export default page;