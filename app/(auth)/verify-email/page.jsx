'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const searchParams = useSearchParams()
    const verificationToken = searchParams.get('verificationToken')

    return (
        <section>
            {verificationToken}
        </section>
    );
};

export default Page;