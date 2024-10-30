'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const SearchBar = ({ className }) => {
    return (
        <div className={`relative ${className}`}>
            <Input
                type="text"
                placeholder="搜索募捐活动..."
                className="pl-10"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        </div>
    );
};