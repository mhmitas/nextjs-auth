import Link from 'next/link';
import React from 'react';
import NavLinks from './Navlinks';
import { Button } from './ui/button';

const Navbar = () => {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <Link className="flex items-center justify-center" href="/">
                <span className="sr-only">Acme Inc</span>
                <span className='text-2xl font-bold'>MH</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <NavLinks />
                <Button size="sm" asChild>
                    <Link href="/sign-in">Sign In</Link>
                </Button>
            </nav>
        </header>
    );
};

export default Navbar;