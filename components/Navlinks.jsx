'use client'
import { cn } from '@/lib/utils';
// components/NavLink.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Test", href: "/test" },
    ]

    return (
        <div className="ml-10 flex items-center space-x-4">
            {navItems.map(item => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                        "py-1 px-[2px] text-sm font-medium transition-colors border-b-2 border-transparent hover:border-blue-600 rounded-none",
                        pathname === item.href && "border-b-2 border-blue-600"
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;
