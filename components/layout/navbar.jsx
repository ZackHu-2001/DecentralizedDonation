// components/layout/navbar.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ethers } from 'ethers';
import {
    Home,
    Search,
    Plus,
    User,
    Wallet,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';

export function Navbar() {
    const pathname = usePathname();
    const [account, setAccount] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask');
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    const navigationLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Campaigns', href: '/campaigns', icon: Search },
        { name: 'Create', href: '/campaigns/create', icon: Plus },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Navigation */}
                    <div className="flex">
                        <Link href="/" className="flex items-center">
                            <motion.span
                                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                DonateChain
                            </motion.span>
                        </Link>

                        {/* Desktop Navigation */}
                        {/* <div className="hidden md:flex items-center space-x-4 ml-10">
                            {navigationLinks.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href
                                                ? 'text-blue-600'
                                                : 'text-gray-500 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div> */}
                    </div>

                    {/* Account and Wallet */}
                    <div className="hidden md:flex items-center space-x-4">
                        {account ? (
                            <motion.div
                                className="flex items-center space-x-4"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2 hover:border-blue-400 transition-colors">
                                            <User className="w-4 h-4" />
                                            {`${account.slice(0, 6)}...${account.slice(-4)}`}
                                            <ChevronDown className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <Link href="/profile">
                                            <DropdownMenuItem>
                                                My Profile
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="/campaigns">
                                            <DropdownMenuItem>
                                                My Campaigns
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onClick={() => setAccount('')}>
                                            Disconnect
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button onClick={connectWallet} className="gap-2 shadow-md hover:shadow-lg transition-shadow">
                                    <Wallet className="w-4 h-4" />
                                    Connect Wallet
                                </Button>
                            </motion.div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden border-t border-gray-200 bg-white"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <motion.div
                            className="px-2 pt-2 pb-3 space-y-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {navigationLinks.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                pathname === item.href
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            {!account && (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: navigationLinks.length * 0.1 }}
                                >
                                    <Button
                                        onClick={connectWallet}
                                        className="w-full gap-2 mt-2"
                                    >
                                        <Wallet className="w-4 h-4" />
                                        Connect Wallet
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
