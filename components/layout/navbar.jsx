// components/layout/navbar.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Navigation */}
                    <div className="flex">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold">DonateChain</span>
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
                            <div className="flex items-center space-x-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
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
                            </div>
                        ) : (
                            <Button onClick={connectWallet} className="gap-2">
                                <Wallet className="w-4 h-4" />
                                Connect Wallet
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigationLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {item.name}
                                </Link>
                            );
                        })}
                        {!account && (
                            <Button
                                onClick={connectWallet}
                                className="w-full gap-2"
                            >
                                <Wallet className="w-4 h-4" />
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
