
// components/layout/sidebar.jsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Home,
    Search,
    PlusCircle,
    Users,
    TrendingUp,
    Settings,
    HelpCircle
} from 'lucide-react';

export function Sidebar() {
    return (
        <div className="hidden lg:flex flex-col w-64 border-r bg-white h-screen sticky top-16">
            <div className="p-4 space-y-2">
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Home className="w-4 h-4" />
                        Home
                    </Button>
                </Link>

                <Link href="/campaigns">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Search className="w-4 h-4" />
                        Explore
                    </Button>
                </Link>

                <Link href="/campaigns/create">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Create Campaign
                    </Button>
                </Link>

                <Link href="/community">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Users className="w-4 h-4" />
                        Community
                    </Button>
                </Link>

                <Link href="/rankings">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Rankings
                    </Button>
                </Link>

                <div className="border-t my-4" />

                <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                    </Button>
                </Link>

                <Link href="/help">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Help Center
                    </Button>
                </Link>
            </div>
        </div>
    );
}