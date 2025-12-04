// components/layout/sidebar.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Home,
    Search,
    PlusCircle,
    Users,
    User,
    TrendingUp,
    Settings,
    HelpCircle
} from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/campaigns', icon: Search },
    { name: 'Create Campaign', href: '/campaigns/create', icon: PlusCircle },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Profile', href: '/profile/', icon: User },
    { name: 'Rankings', href: '/rankings', icon: TrendingUp },
];

const settingsItems = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help Center', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex flex-col w-64 border-r bg-white h-screen sticky top-16">
            <div className="p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.name} href={item.href}>
                            <Button
                                variant={isActive ? 'default' : 'ghost'}
                                className="w-full justify-start gap-2"
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </Button>
                        </Link>
                    );
                })}

                <div className="border-t my-4" />

                {settingsItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.name} href={item.href}>
                            <Button
                                variant={isActive ? 'default' : 'ghost'}
                                className="w-full justify-start gap-2"
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </Button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}