import Link from 'next/link';
import React from 'react';
import NavLinks from './Navlinks';
import { Button } from './ui/button';
import { auth, signOut } from '@/auth';

const Navbar = async () => {
    const session = await auth()

    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <Link className="flex items-center justify-center" href="/">
                <span className="sr-only">Acme Inc</span>
                <span className='text-2xl font-bold'>MH</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <NavLinks />
                <div>
                    {
                        session ? (
                            <div className='flex gap-4 items-center'>
                                <div className='flex flex-row items-center gap-2'>
                                    <figure><img src={session.user?.picture} alt="user avatar" className='w-9 rounded-full' width={50} height={50} /></figure>
                                    <div className='flex flex-col'>
                                        <h3>
                                            {session.user?.firstName}
                                        </h3>
                                        <h3>
                                            {session.user?.email}
                                        </h3>
                                    </div>
                                </div>
                                <form
                                    action={async () => {
                                        "use server"
                                        await signOut()
                                    }}
                                >
                                    <Button>Sign Out</Button>
                                </form>
                            </div>
                        ) : (
                            <Button size="sm" asChild>
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                        )

                    }
                </div>
            </nav>
        </header >
    );
};

export default Navbar;