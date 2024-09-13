'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    const router = useRouter()
    const [processing, setProcessing] = useState(false)
    const searchParams = useSearchParams()
    const verificationToken = searchParams.get('verificationToken')
    const email = searchParams.get('email')

    if (!verificationToken) {
        redirect('/')
    }
    if (!email) {
        redirect('/')
    }

    async function verifyToken() {
        setProcessing(true)
        try {
            const res = await axios.post(`/api/auth/verify-email?verificationToken=${verificationToken}&email=${email}`)

            if (res.status === 200) {
                router.push("/sign-in")
                toast("Please sign in")
            }
            setProcessing(false)
        } catch (error) {
            toast.error("Unauthorized")
            console.error(error?.response?.data?.message)
            setProcessing(false)
            throw new Error("Email verification error: " + error)
        }
    }

    return (
        <section className='min-h-screen w-full bg-muted dark:bg-background flex justify-center items-center'>
            <div className='max-w-sm m-2 aspect-video rounded-lg w-full bg-background dark:bg-muted flex justify-center items-center'>
                <Button onClick={verifyToken} size="lg">
                    {processing ?
                        <span><LoaderCircle className='animate-spin' /></span> :
                        "Verify"
                    }
                </Button>
            </div>
        </section>
    );
};

export default Page;