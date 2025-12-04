// components/layout/sidebar.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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
        <motion.div
            className="hidden lg:flex flex-col w-64 border-r bg-white/80 backdrop-blur-md h-screen sticky top-16 shadow-sm"
            initial={{ x: -64, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="p-4 space-y-1">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <motion.div
                            key={item.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Link href={item.href}>
                                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        variant={isActive ? 'default' : 'ghost'}
                                        className={`w-full justify-start gap-3 transition-all ${
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                                : 'hover:bg-gray-100 hover:text-blue-600'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="font-medium">{item.name}</span>
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}

                <div className="border-t my-4" />

                {settingsItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <motion.div
                            key={item.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: (navItems.length + index) * 0.05 }}
                        >
                            <Link href={item.href}>
                                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        variant={isActive ? 'default' : 'ghost'}
                                        className={`w-full justify-start gap-3 transition-all ${
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                                : 'hover:bg-gray-100 hover:text-blue-600'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="font-medium">{item.name}</span>
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}