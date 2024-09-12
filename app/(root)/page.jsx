'use client'
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React from 'react';

const page = () => {

    async function sendMail() {
        try {
            const res = await axios.post('/api/test', {
                email: "mhmitas.dev@gmail.com",
                token: "demo-token"
            })
            console.log(res.data);
        } catch (error) {
            console.error("sending mail failed", error);
        }
    }

    return (
        <main>
            <Hero />
            <div className='p-10'>
                <Button onClick={sendMail}>Send Mail</Button>
            </div>
        </main>
    );
};

export default page;